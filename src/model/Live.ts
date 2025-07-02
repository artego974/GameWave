import { time } from "console";
import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { User } from "./User";
import { Games } from "./Game";

@Entity("lives")
export class Live {
    @PrimaryColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    private _link: string

    @Column({ type: "varchar", length: 255, nullable: false })
    private _titulo: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    private _subtitulo: string;

    @ManyToOne(() => User, (user) => user.Live)
    user!: User;

    @ManyToOne(() => Games, (game) => game.live)
    game!: Games

    public get link(): string {
        return this._link
    }

    public get titulo(): string {
        return this._titulo;
    }

    public get subtitulo(): string {
        return this._subtitulo;
    }

    public set link(link: string) {
        this._link = link
    }

    public set titulo(titulo: string) {
        this._titulo = titulo;
    }

    public set subtitulo(subtitulo: string) {
        this._subtitulo = subtitulo;
    }

    constructor(link: string, titulo: string, subtitulo: string, tipo: string,) {
        this._link = link
        this._titulo = titulo;
        this._subtitulo = subtitulo;
    }
}