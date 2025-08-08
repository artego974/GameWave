import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { User } from "./User";
import { Participantes } from "./Participantes";
import { Games } from "./Game";
@Entity('campeonato')
export class Campeonato {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    name: string;

    @Column({type: "varchar", nullable: true, default: "fotoPadrao"})
    fotoCampeonato!: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({ type: 'int', nullable: false })
    numberOfPlayers: number;

    @Column({ type: "date", nullable: false })
    date: string;

    @Column({ type: "time", nullable: false })
    time: string;

    @ManyToOne(() => Games, (game) => game.campeonato)
    game!: Games;

    @ManyToOne(()=> User, (host) => host.campeonato)
    host!: User

    @ManyToOne(() => Participantes, (participantes) => participantes.campeonato)
    participantes!: Participantes;


    constructor(name: string, description:string, numberOfPlayers:number,date: string, time: string) {
        this.name = name;
        this.description = description;
        this.numberOfPlayers = numberOfPlayers;
        this.date = date;
        this.time = time;
    }



}