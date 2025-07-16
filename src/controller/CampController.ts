import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Campeonato } from '../model/Campeonato';
import { Games } from '../model/Game';

const campRepository = AppDataSource.getRepository(Campeonato);
const gameRepository = AppDataSource.getRepository(Games)

export class CampeonatoController {
    // Listar todos os campeonatos
    async list(req: Request, res: Response) {
        const camp = await campRepository.find();
        res.json(camp);
        return;
    }

    // Criar novo Campeonato
    async create(req: Request, res: Response) {
        const { name, description, nameGame, timeDate, numberOfPlayers } = req.body;

            if(!name || !description || !nameGame || !timeDate || !numberOfPlayers){
                res.status(400).json({message: "Preencha todos os campos"})
                return;
            }

            const verificaCamp = await campRepository.findOneBy({ name })
            
            if(verificaCamp) {
                res.status(400).json({message: "Nome de campeonato invalido"})
                return;
            }

            const verificaGame = await gameRepository.findOneBy({name:(nameGame)})
            if(!verificaGame){
                res.status(401).json({message: "Jogo não encontrado"})
                return;
            }


            const campeonato = new Campeonato(name, description, numberOfPlayers,timeDate)
            campeonato.game = verificaGame;

            await campRepository.save(campeonato);
            res.status(201).json(campeonato);
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

    
    async shew(req:Request,res:Response){
        const {name} = req.body;
        const camp = await campRepository.findOneBy({ name });

        if(!camp){
            res.status(404).json({menssagem: "Campeonato não encontrado!"});
            return;
        }
        res.status(200).json(camp);
        return;
    }

}