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

    @Column({type: "varchar", nullable: true})
    fotoCampeonato!: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({ type: 'int', nullable: false })
    numberOfPlayers: number;

    @Column({ type: 'datetime', nullable: false })
    timeDate: Date;

    @ManyToOne(() => Games, (game) => game.campeonato)
    game!: Games;

    @ManyToOne(()=> User, (host) => host.campeonato)
    host!: User

    @ManyToOne(() => Participantes, (participantes) => participantes.campeonato)
    participantes!: Participantes;


    constructor(name: string, description:string, numberOfPlayers:number,timeDate: Date) {
        this.name = name;
        this.description = description;
        this.numberOfPlayers = numberOfPlayers;
        this.timeDate = timeDate;
    }



}