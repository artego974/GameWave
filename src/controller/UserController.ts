import {Request, Response} from "express"
import { User } from "../model/User"
import { AppDataSource } from "../config/data-source"
import bcrypt from "bcryptjs"

const userRepository = AppDataSource.getRepository(User);

export class UserController{
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
            const newUser = new User(name,email,password,nickName)
            const user = userRepository.create(newUser);
            await userRepository.save(user);
            res.status(201).json(user);
            return;
        }  
    }

    async delete(req:Request,res:Response){
        const {id} = req.params;

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
        const {nickName} = req.body;
        const user = await userRepository.findOne({ where: {
            _nickName: nickName
        } });

        if(!user){
            res.status(404).json({menssagem: "User não encontrado!"});
            return;
        }
        res.status(200).json(user);
        return;
    }

    async updatePassword(req: Request, res:Response){
        const {id} = req.params
        const {password, newPassword} = req.body
        
        const user = await userRepository.findOneBy({id:Number(id)});

        if(!user){
            res.status(404).json({menssagem: "User não encontrado!"});
            return;
        }

        if(!newPassword  || !password){
            res.status(400).json({message: "Insira todos campos!"});
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            res.status(401).json({message: "Senha invalida!"});
            return;
        }

        user.password = newPassword

        await userRepository.save(user)
        res.status(200).json(user);
        return;
    }

    async updateEmail(req: Request, res:Response){
        const {id} = req.params
        const {password, newEmail} = req.body
        
        const user = await userRepository.findOneBy({id:Number(id)});

        if(!user){
            res.status(404).json({menssagem: "User não encontrado!"});
            return;
        }

        if(!newEmail  || !password){
            res.status(400).json({message: "Insira todos campos!"});
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            res.status(401).json({message: "Senha invalida!"});
            return;
        }

        user.email = newEmail

        await userRepository.save(user)
        res.status(200).json(user);
        return;
    }
    

    async update(req:Request,res:Response){
        const {id} = req.params;
        const {name,nickName} = req.body;

        const user = await userRepository.findOneBy({id:Number(id)});

        if(!user){
            res.status(404).json({menssagem: "Usuario não encontrado"})
            return;
        }

        if(name != ''){
            user.name = name;
        }
        if(nickName != ''){
            user.nickName = nickName;
        }

        await userRepository.save(user)
        res.status(200).json(user);
        return;
    }
}