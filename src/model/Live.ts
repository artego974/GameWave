import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { User } from "./User";
import { Games } from "./Game";

@Entity("lives")
export class Live {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar", nullable: true, default:"imagemPadrão"})
    img!: string

    @Column({ type: "text", nullable: false })
    link: string

    @Column({ type: "varchar", length: 255, nullable: false })
    titulo: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    subtitulo: string;

    @ManyToOne(() => User, (user) => user.Live)
    user!: User;

    constructor(link: string, titulo: string, subtitulo: string) {
        this.link = link
        this.titulo = titulo;
        this.subtitulo = subtitulo;
    }
}