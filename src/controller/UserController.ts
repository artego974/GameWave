import { Request, Response } from "express"
import { User } from "../model/User"
import { AppDataSource } from "../config/data-source"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";                         // Biblioteca para manipulação de Tokens JWT (Authenticação)
import dotenv from "dotenv";                            // Biblioteca para carregar variáveis de ambiente

const userRepository = AppDataSource.getRepository(User);

dotenv.config();                                        // Carrega as variáveis de ambiente do arquivo .env

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret; // Obtém a chave secreta para JWT do ambiente

// Verifica se a variável de ambiente JWT_SECRET está definida
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}

export class UserController {
    async list(req: Request, res: Response) {
        const prod = await userRepository.find();
        res.json(prod);
        return;
    }

    async create(req: Request, res: Response) {
        const { name, email, nickName, password } = req.body;
        if (name == '' || nickName == '' || password == '' || email == '') {
            res.status(400).json({ messagem: "Preencha todos os campos!" })
            return
        } else {
            const newUser = new User(name, email, password, nickName)
            const user = userRepository.create(newUser);
            await userRepository.save(user);
            res.status(201).json(user);
            return;
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(401).json({ menssagem: "User não encontrado" });
            return;
        }
        await userRepository.remove(user);
        res.status(204).send();
        return;
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userRepository.findOneBy({ id: Number(id) });
        if (!user) {
            res.status(404).json({ menssagem: "User não encontrado!" });
            return;
        }
        res.status(201).json(user);
        return;
    }

    async shew(req: Request, res: Response) {
        const { nickName } = req.body;
        const user = await userRepository.findOneBy({ nickName });

        if (!user) {
            res.status(404).json({ menssagem: "User não encontrado!" });
            return;
        }
        res.status(200).json(user);
        return;
    }

    async updatePassword(req: Request, res: Response) {
        const { id } = req.params
        const { password, newPassword } = req.body

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ menssagem: "User não encontrado!" });
            return;
        }

        if (!newPassword || !password) {
            res.status(400).json({ message: "Insira todos campos!" });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            res.status(401).json({ message: "Senha invalida!" });
            return;
        }

        user.password = newPassword

        await userRepository.save(user)
        res.status(200).json(user);
        return;
    }

    async updateEmail(req: Request, res: Response) {
        const { id } = req.params
        const { password, newEmail } = req.body

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ menssagem: "User não encontrado!" });
            return;
        }

        if (!newEmail || !password) {
            res.status(400).json({ message: "Insira todos campos!" });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            res.status(401).json({ message: "Senha invalida!" });
            return;
        }

        user.email = newEmail

        await userRepository.save(user)
        res.status(200).json(user);
        return;
    }


    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, nickName } = req.body;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ menssagem: "Usuario não encontrado" })
            return;
        }

        if (name != '') {
            user.name = name;
        }
        if (nickName != '') {
            user.nickName = nickName;
        }

        await userRepository.save(user)
        res.status(200).json(user);
        return;
    }

    // Método para logar no site
    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;

        //verifica se ambos campos foram fornecidos
        if (!email || !password) {
            res.status(400).json({ message: "Email e senha são necessarios." });
            return;
        }

        try {
            // Busca o usuário no banco de dados pelo email
            const user = await userRepository.findOneBy({ email });
            console.log(user);
            
            
            // Se não encontrar o usuário
            if (!user) {
                res.status(401).json({ message: "Usuario não encontrado." });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            // Se a senha não for válida
            if (!isPasswordValid) {
                res.status(401).json({ message: "Senha invalida." });
                return;
            }

            const { password: _, ...userWithoutPassword } = user; // Remove a senha do objeto
             
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

            // Salva o token no cookie
            res.cookie("token", token, {
                httpOnly: true,                                 // Define o cookie como HttpOnly (não acessível via JavaScript)
                secure: process.env.NODE_ENV === "production",  // Define o cookie como seguro (só enviado via HTTPS em produção)
                sameSite: "none",                               // Define o cookie como None (padrão para cookies de terceiros)
                maxAge: 1000 * 60 * 60                          // 1 hora em ms
            });

            // Se tudo estiver correto, retorna sucesso (200) com os dados do usuário sem a senha
            res.status(200).json({ message: "Logado com sucesso.", user: userWithoutPassword });
            
        } catch (error) {
            // Em caso de erro inesperado, exibe o erro e retorna 500
            console.error("Erro ao logar no user:", error);
            res.status(500).json({ message: "Erro bizonho ou erro de server." });
        }
    }

    async logoutUser(req: Request, res: Response): Promise<void> {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful." });
    }

    async uploadAvatar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const user = await userRepository.findOneBy({ id: Number(id) });
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }

            if (!req.file) {
                res.status(400).json({ error: "Nenhum arquivo enviado." });
                return;
            }

            // Atualiza o caminho da foto de perfil no banco
            user.fotoPerfil = `../../src/middlewares/upload/${req.file.filename}`;

            await userRepository.save(user);

            res.status(200).json({
                message: "Foto de perfil atualizada com sucesso!",
                fotoPerfil: user.fotoPerfil,
                user,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao atualizar foto de perfil." });
        }
    }

    async uploadBanner(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const user = await userRepository.findOneBy({ id: Number(id) });
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }

            if (!req.file) {
                res.status(400).json({ error: "Nenhum arquivo enviado." });
                return;
            }

            // Atualiza o caminho do banner no banco
            user.banerPerfil = `../../src/middlewares/upload/${req.file.filename}`;

            await userRepository.save(user);

            res.status(200).json({
                message: "Banner atualizado com sucesso!",
                banerPerfil: user.banerPerfil,
                user,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao atualizar banner." });
        }
    }

    async profile(req: Request, res: Response) {
        try {
          const user = await userRepository.findOneBy({ id: req.user!.id });
      
          if (!user) {
            res.status(404).json({ message: "Usuário não encontrado." });
            return;
          }
      
          const { password: _, ...userWithoutPassword } = user;
      
          res.status(200).json({
            ...userWithoutPassword,
            avatarUrl: `${process.env.BASE_URL || "http://localhost:3000"}${user.fotoPerfil || ""}`,
            bannerUrl: `${process.env.BASE_URL || "http://localhost:3000"}${user.banerPerfil || ""}`
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erro ao buscar perfil." });
        }
      }      
      
}