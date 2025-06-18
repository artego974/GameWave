<<<<<<< HEAD
import {Request, Response} from "express"
import { User } from "../model/User"
import { AppDataSource } from "../config/data-source"

const userRepository = AppDataSource.getRepository(User);

export class ProductController{
    async list(req: Request,res:Response){
        const prod = await userRepository.find();
        res.json(prod);
        return;
    }

    async create(req:Request,res:Response){
        const {name,email,nickName,password} = req.body;
        if(name == '' || nickName =='' || password == ''|| email == ''){
            res.status(400).json({  messagem: "Preencha todos os campos!" })
            return
        }else{
            const user = userRepository.create({name,email,nickName,password});
            await userRepository.save(user);
            res.status(201).json(user);
            return;
        }  
    }

    async delete(req:Request,res:Response){
        const {id} = req.body;

        const user = await userRepository.findOneBy({id:Number(id)});

        if(!user){
            res.status(401).json({ menssagem: "User não encontrado" });
            return;
        }
        await userRepository.remove(user);
        res.status(204).send();
        return;
    }

    async show(req:Request,res:Response){
        const {id} = req.params;
        const user = await userRepository.findOneBy({id:Number(id)});
        if(!user){
            res.status(404).json({menssagem: "User não encontrado!"});
            return;
        }
        res.status(201).json(user);
        return;
    }

    async shew(req:Request,res:Response){
        const {name} = req.params;
        const user = await userRepository.findOneBy({name:String(name)});

        if(!user){
            res.status(404).json({menssagem: "User não encontrado!"});
            return;
        }
        res.status(201).json(user);
        return;
    }

    async update(req:Request,res:Response){
        const {id} = req.params;
        const {name,nickName,email,password} = req.body;

        const prod = await userRepository.findOneBy({id:Number(id)});

        if(!prod){
            res.status(404).json({menssagem: "Produto não encontrado"})
            return;
        }

        if(name != ''){
            prod.name = name;
        }
        if(nickName != ''){
            prod.nickName = nickName;
        }
        if(email != ''){
            prod.email = email;
        }
        if(password != ''){
            prod.password = password;
        }

        await userRepository.save(prod)
        res.json(prod);
        return;
=======
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
>>>>>>> 089f226b8f26d845078a6ff3296959591947c746
    }
}