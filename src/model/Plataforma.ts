import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Games } from "./Game";
import { Campeonato } from "./Campeonato";

@Entity('plataforma')
export class Plataforma{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: 'varchar', length: 255, nullable: false, unique: true})
    name: string;

    @ManyToMany(() => Games)
    @JoinTable({ name: 'game_plataforma' })
    Game!: Games[];

    @ManyToMany(() => Campeonato)
    @JoinTable({ name: 'plataforma_campeonatos' })
    Campeonato!: Campeonato[];


    constructor(name: string){
        this.name = name
    }
}