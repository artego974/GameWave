import { Plataforma } from "../model/Plataforma";
import { Request,Response } from "express";
import { AppDataSource } from "../config/data-source";

const plataformaRepository = AppDataSource.getRepository(Plataforma);

export class plataformaController {
    // Listar todos as plataformas
    async list(req: Request, res: Response) {
        const plataforma = await plataformaRepository.find();
        res.json(plataforma);
        return;
    }

    // Criar nova plataforma
    async create(req: Request, res: Response) {
        const { name } = req.body;

            const plataforma = plataformaRepository.create({ name });
            await plataformaRepository.save(plataforma);
            res.status(201).json(plataforma);
            return;
    }

    // Buscar plataforma por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const plataforma = await plataformaRepository.findOneBy({ id: Number(id) });

        if (!plataforma) {
            res.status(404).json({ message: 'plataforma não foi encontrada' });
            return;
        }

        res.json(plataforma);
        return;
    }

    // Atualizar plataforma
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;

        if(!id) {
            res.status(400).json({ message: "ID não informado!" });
            return
        }

        if(!name) {
            res.status(400).json({ message: "Informe o nome da plataforma" });
            return            
        }

        const plataforma = await plataformaRepository.findOneBy({ id: Number(id) });

        if(!plataforma) {
            res.status(404).json({ message: "plataforma não encontrada!" });
            return            
        }

        plataforma.name = name;
    }

    // Deletar plataforma
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const plataforma = await plataformaRepository.findOneBy({ id: Number(id) });

        if (!plataforma) {
            res.status(404).json({ menssage: 'plataforma não encontrado!' });
            return;
        }

        await plataformaRepository.remove(plataforma);

        res.status(204).send();
        return;
    }
}