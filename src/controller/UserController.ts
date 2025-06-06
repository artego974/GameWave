import { Request, Response } from 'express';
import { AppDataSource } from '../db/data_source';
import { User } from '../model/User';

const userRepository = AppDataSource.getRepository(User);

export class UserController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const users = await userRepository.find();
        res.json(users);
        return
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { NickName, Name, Password, Email } = req.body;

        const user = userRepository.create({ NickName, Name, Password, Email  });
        await userRepository.save(user);

        res.status(201).json(user);
        return
    }

    // Buscar usuário por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

         res.json(user);
         return
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { NickName, Name, Password, Email  } = req.body;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

        user.NickName;
        user.Name;
        user.Password;
        user.Email;

        await userRepository.save(user);

        res.json(user);
        return
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

        await userRepository.remove(user);

         res.status(204).send();
         return
    }
}