import { Live } from "../model/Live";
import { Request,Response } from "express";
import { AppDataSource } from "../db/data_source";

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
        const { duracao,titulo,subtitulo,tipo,espectadores } = req.body;

            const live = liveRepository.create({duracao,titulo,subtitulo,tipo,espectadores  });
            await liveRepository.save(live);
            res.status(201).json(live);
            return;
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
        const { duracao,titulo,subtitulo,tipo,espectadores } = req.body;

        if(!id) {
            res.status(400).json({ message: "ID não informado!" });
            return
        }

        if(!duracao && !titulo && !subtitulo && !tipo && !espectadores) {
            res.status(400).json({ message: "Informe algum liveo!" });
            return            
        }

        const live = await liveRepository.findOneBy({ id: Number(id) });

        if(!live) {
            res.status(404).json({ message: "live não encontrado!" });
            return            
        }

        live.duracao = duracao ? duracao : live.duracao
        live.titulo = titulo ? titulo : live.titulo
        live.subtitulo = subtitulo ? subtitulo : live.subtitulo
        live.tipo = tipo ? tipo : live.tipo
        live.espectadores = espectadores ? espectadores : live.espectadores

        
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
