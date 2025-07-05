import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Campeonato } from '../model/Campeonato';

const campRepository = AppDataSource.getRepository(Campeonato);

export class CampeonatoController {
    // Listar todos os campeonatos
    async list(req: Request, res: Response) {
        const camp = await campRepository.find();

        const cleanCamp = camp.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          game: c.game,
          numberOfPlayers: c.numberOfPlayers,
          timeDate: c.timeDate,
        }));

        res.json(cleanCamp);        
        return;
    }

    // Criar novo Campeonato
    async create(req: Request, res: Response) {
        const { name, description, game, timeDate, numberOfPlayers } = req.body;

            const camp = campRepository.create({ name, description, game, numberOfPlayers,timeDate  });
            await campRepository.save(camp);
            res.status(201).json(camp);
            return;
    }

    // Buscar campeonato por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const camp = await campRepository.findOneBy({ id: Number(id) });

        if (!camp) {
            res.status(404).json({ message: 'Campeonato não encontrado' });
            return;
        }

        res.json(camp);
        return;
    }

    // Atualizar campeonato
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, game, timeDate, numberOfPlayers } = req.body;

        if(!id) {
            res.status(400).json({ message: "ID não informado!" });
            return
        }

        if(!name && !description && !game && !timeDate && !numberOfPlayers) {
            res.status(400).json({ message: "Informe algum campo!" });
            return            
        }

        const camp = await campRepository.findOneBy({ id: Number(id) });

        if(!camp) {
            res.status(404).json({ message: "Campeonato não encontrado!" });
            return            
        }

        camp.name = name ? name : camp.name
        camp.description = description ? description : camp.description
        camp.game = game ? game : camp.game
        camp.timeDate = timeDate ? timeDate : camp.timeDate
        camp.numberOfPlayers = numberOfPlayers ? numberOfPlayers : camp.numberOfPlayers

        await campRepository.save(camp);
        res.json(camp);
    }

    // Deletar campeonato
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const camp = await campRepository.findOneBy({ id: Number(id) });

        if (!camp) {
            res.status(404).json({ menssage: 'Campeonato não encontrado!' });
            return;
        }

        await campRepository.remove(camp);

        res.status(204).send();
        return;
    }
}