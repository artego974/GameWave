import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
@Entity('Campeonato')
export class Campeonato {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    private _name: string;

    @Column({ type: 'text', nullable: true})
    private _description: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    private _game: string;

    @Column({ type: 'int', nullable: false })
    private _numberOfPlayers: number;

    @Column({ type: 'datetime', nullable: false })
    private _timeDate: Date;


    constructor(name: string, description:string, game:string, numberOfPlayers:number,timeDate: Date) {
        this._name = name;
        this._description = description;
        this._game = game;
        this._numberOfPlayers = numberOfPlayers;
        this._timeDate = timeDate;
    }
}