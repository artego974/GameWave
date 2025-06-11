import { time } from "console";
import { Entity,PrimaryColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("lives")
export class Live {
    @PrimaryColumn()
    id!: number;
    @Column({type:"time", nullable:false})
    private _duracao: Date;
    @Column({type:"varchar",length:255, nullable:false})
    private _titulo: string;
    @Column({type:"varchar",length:255, nullable:false})
    private _subtitulo: string;
    @Column({type:"varchar",length:255, nullable:false})
    private _tipo: string;
    @Column({type:"int", nullable:false})
    private _espectadores: number;
    @ManyToOne(()=> User,(user) => user.Live)
    user!:User;

    constructor(duracao:Date,titulo:string,subtitulo:string,tipo:string,espectadores:number){
        this._duracao = duracao;
        this._titulo = titulo;
        this._subtitulo = subtitulo;
        this._tipo = tipo;
        this._espectadores = espectadores;

    }
}
