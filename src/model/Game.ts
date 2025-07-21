import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Campeonato } from "./Campeonato";
import { Live } from "./Live";

@Entity('games')
export class Games{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    name: string;

    @Column({ type: "text"})
    description: string;

    @OneToMany(() => Campeonato, (camp) => camp.game)
    campeonato!: Campeonato;

    @OneToMany(() => Live, (live) => live.game)
    live!: Live;


    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }
}