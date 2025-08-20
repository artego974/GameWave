import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, AfterLoad, ManyToMany, ManyToOne, JoinTable, OneToOne } from "typeorm";
import { Campeonato } from "./Campeonato";
import { Live } from "./Live";
import bcrypt from "bcryptjs";
import { Participantes } from "./Participantes";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    nickName: string;

    @Column({ type: 'varchar', default: "../../assets" })
    fotoPerfil!: string

    @Column({ type: 'varchar', default: "../../assets" })
    banerPerfil!: string

    @OneToMany(() => Live, (live) => live.user)
    lives!: Live[];

    @OneToMany(() => Campeonato, (campeonato) => campeonato.host)
    campeonatos!: Campeonato[];





    @ManyToOne(() => Participantes, (participantes) => participantes.campeonato)
    participantes!: Participantes;

    private originalPassword: string

    constructor(name: string, email: string, password: string, nickName: string) {
        this.nickName = nickName
        this.name = name;
        this.email = email;
        this.password = password;
        this.originalPassword = password
    }

    @AfterLoad()
    setOriginalPassword() {
        this.originalPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password !== this.originalPassword) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
        }
    }

}