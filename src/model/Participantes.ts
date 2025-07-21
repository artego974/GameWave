import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Campeonato } from "./Campeonato";

@Entity("participantes")
export class Participantes{
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => Campeonato, (camp) => camp.participantes)
    campeonato!: Campeonato;

    @OneToMany(() => User, (user) => user.participantes)
    user!: User

    constructor(user:User, camp: Campeonato){
        this.user = user
        this.campeonato = camp

    }
}