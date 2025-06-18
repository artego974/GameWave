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


     // GETTERS
     public get duracao(): Date {
        return this._duracao;
    }

    public get titulo(): string {
        return this._titulo;
    }

    public get subtitulo(): string {
        return this._subtitulo;
    }

    public get tipo(): string {
        return this._tipo;
    }

    public get espectadores(): number {
        return this._espectadores;
    }

    // SETTERS
    public set duracao(duracao: Date) {
        this._duracao = duracao;
    }

    public set titulo(titulo: string) {
        this._titulo = titulo;
    }

    public set subtitulo(subtitulo: string) {
        this._subtitulo = subtitulo;
    }

    public set tipo(tipo: string) {
        this._tipo = tipo;
    }

    public set espectadores(espectadores: number) {
        this._espectadores = espectadores;
    }
    constructor(duracao:Date,titulo:string,subtitulo:string,tipo:string,espectadores:number){
        this._duracao = duracao;
        this._titulo = titulo;
        this._subtitulo = subtitulo;
        this._tipo = tipo;
        this._espectadores = espectadores;

    }
}
