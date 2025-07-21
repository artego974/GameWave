import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { User } from "./User";
import { Games } from "./Game";

@Entity("lives")
export class Live {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"text"})
    img: string

    @Column({ type: "text", nullable: false })
    link: string

    @Column({ type: "varchar", length: 255, nullable: false })
    titulo: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    subtitulo: string;

    @ManyToOne(() => User, (user) => user.Live)
    user!: User;

    @ManyToOne(() => Games, (game) => game.live)
    game!: Games


    constructor(link: string, titulo: string, subtitulo: string, img:string) {
        this.link = link
        this.titulo = titulo;
        this.subtitulo = subtitulo;
        this.img = img
    }
}