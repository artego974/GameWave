import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Games } from '../models/Game';

const gameRepository = AppDataSource.getRepository(Games);

export class GameController {
    // Listar todos os games
    async list(req: Request, res: Response) {
        const game = await gameRepository.find();
        res.status(200).json(game);
        return;
    }

    // Criar novo games
    async create(req: Request, res: Response) {
        const { name,description } = req.body;

        if(!name){
            res.status(400).json({message: "Insira o nome do Jogo"})
            return;
        }

        const nameGame = gameRepository.findOneBy({name: name})

        if(nameGame !== null){
            res.status(409).json({message: "Jogo já existente!"})
            return;
        }

        const game = gameRepository.create({name, description});
        await gameRepository.save(game);
        res.status(201).json(game);
        return;
    }
    // Buscar game por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const game = await gameRepository.findOneBy({ id: Number(id) });

        if (!game) {
            res.status(404).json({ message: 'Jogo não encontrado' });
            return;
        }

        res.status(200).json(game);
        return;
    }

    // Atualizar campeonato
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description} = req.body;

        if(!id) {
            res.status(400).json({ message: "ID não informado!" });
            return
        }

        if(!name && !description) {
            res.status(400).json({ message: "Informe algum campo!" });
            return;           
        }

        const game = await gameRepository.findOneBy({ id: Number(id) });

        if(!game) {
            res.status(404).json({ message: "Jogo não encontrado!" });
            return            
        }

        game.name = name ? name : game.name
        game.description = description ? description : game.description
        await gameRepository.save(game);
        res.status(202).json(game)
        return;
    }

    // Deletar campeonato
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const game = await gameRepository.findOneBy({ id: Number(id) });

        if (!game) {
            res.status(404).json({ menssage: 'Jogo não encontrado!' });
            return;
        }

        await gameRepository.remove(game);
        res.status(204).send();
        return;
    }
}