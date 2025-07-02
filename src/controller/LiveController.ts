import { Live } from "../model/Live";
import { Request,Response } from "express";
import { AppDataSource } from "../config/data-source";


const liveRepository = AppDataSource.getRepository(Live);

export class liveController {
    // Listar todos os lives
    async list(req: Request, res: Response) {
        const live = await liveRepository.find();
        res.json(live);
        return;
    }

    // Criar novo live
    async create(req: Request, res: Response) {
        const { link,titulo,subtitulo } = req.body;
        if(link == '' || titulo =='' || subtitulo == ''){
            res.status(400).json({  messagem: "Preencha todos os campos!" })
            return
        }else{
            const live = liveRepository.create({link,titulo,subtitulo});
            await liveRepository.save(live);
            res.status(201).json(live);
            return;
        }
    }

    // Buscar live por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const live = await liveRepository.findOneBy({ id: Number(id) });

        if (!live) {
            res.status(404).json({ message: 'live não encontrado' });
            return;
        }

        res.json(live);
        return;
    }

    // Atualizar live
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { link,titulo,subtitulo} = req.body;

        if(!id) {
            res.status(400).json({ message: "ID não informado!" });
            return
        }

        if(!link && !titulo && !subtitulo) {
            res.status(400).json({ message: "Informe algum campo!" });
            return;          
        }

        const live = await liveRepository.findOneBy({ id: Number(id) });

        if(!live) {
            res.status(404).json({ message: "live não encontrada!" });
            return            
        }

        live.link = link ? link : live.link
        live.titulo = titulo ? titulo : live.titulo
        live.subtitulo = subtitulo ? subtitulo : live.subtitulo
        
    }

    // Deletar live
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const live = await liveRepository.findOneBy({ id: Number(id) });

        if (!live) {
            res.status(404).json({ menssage: 'live não encontrado!' });
            return;
        }

        await liveRepository.remove(live);

        res.status(204).send();
        return;
    }
}