import { Participantes } from "../model/Participantes";
import { User } from "../model/User";
import { Campeonato } from "../model/Campeonato";
import { Request,Response } from "express";
import { AppDataSource } from "../config/data-source";


const participantesRepository = AppDataSource.getRepository(Participantes);
const userRepository = AppDataSource.getRepository(User);
const campeonatoRepository = AppDataSource.getRepository(Campeonato);

export class participanteController {
    async entryCamp(req: Request, res: Response) {
        const { userId, CampId } = req.body;

        const user = await userRepository.findOneBy({ id: Number(userId) });

        if(!user){
            res.status(400).json({message: "User não encontrado"});
            return;
        }

        const campeonato = await campeonatoRepository.findOneBy({id:Number(CampId)})
        if(!campeonato){
            res.status(400).json({message: "Campeonato não encontrado"});
            return;
        }

        const participantes = participantesRepository.create({ user, campeonato });
        await participantesRepository.save(participantes);
        res.status(201).json(participantes);
        return;

    }

    async sairCamp(req: Request, res: Response) {
        const {id} = req.params

        const participantes = await participantesRepository.findOneBy({ id: Number(id) });

        if (!participantes) {
            res.status(404).json({ menssage: 'Participante não encontrado!' });
            return;
        }

        await participantesRepository.remove(participantes);

        res.status(204).send();
        return;
    }
}