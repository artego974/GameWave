import { Live } from "../model/Live";
import { Request,Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../model/User";


const liveRepository = AppDataSource.getRepository(Live);
const userRepository = AppDataSource.getRepository(User)

export class liveController {
    // Listar todos os lives
    async list(req: Request, res: Response) {
        const live = await liveRepository.find();
        res.json(live);
        return;
    }

    // Criar novo live
    async create(req: Request, res: Response) {
        const { link,titulo,subtitulo, hostId } = req.body;
        if(link == '' || titulo =='' || subtitulo == ''){
            res.status(400).json({  messagem: "Preencha todos os campos!" })
            return
        }else{
            const newLive = new Live(link, titulo, subtitulo)

            const verificaUser = await userRepository.findOneBy({id:(hostId)})
            if(!verificaUser){
                res.status(401).json({message: "Usuario não encontrado"})
                return;
            }

            newLive.user = verificaUser
            const live = liveRepository.create(newLive);
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

    async uploadBanner(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const live = await liveRepository.findOneBy({ id: Number(id) });
            if (!live) {
                res.status(404).json({ error: "Live não encontrado." });
                return;
            }

            if (!req.file) {
                res.status(400).json({ error: "Nenhum arquivo enviado." });
                return;
            }

            // Atualiza o caminho do banner no banco
            live.img = `../../src/middlewares/upload/${req.file.filename}`;

            await liveRepository.save(live);

            res.status(200).json({
                message: "Banner atualizado com sucesso!",
                img: live.img,
                live,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao atualizar banner." });
        }
    }

}