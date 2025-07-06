import {Request, Response} from "express"
import { User } from "../model/User"
import { AppDataSource } from "../config/data-source"

const userRepository = AppDataSource.getRepository(User);

export class UserController{
    async list(req: Request,res:Response){
        const User = await userRepository.find();
        res.json(User);
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

        const User = await userRepository.findOneBy({id:Number(id)});

        if(!User){
            res.status(404).json({menssagem: "Useruto não encontrado"})
            return;
        }

        if(name != ''){
            User.name = name;
        }
        if(nickName != ''){
            User.nickName = nickName;
        }
        if(email != ''){
            User.email = email;
        }
        if(password != ''){
            User.password = password;
        }

        await userRepository.save(User)
        res.json(User);
        return;
    }
}