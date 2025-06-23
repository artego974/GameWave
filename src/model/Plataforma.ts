import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Games } from "./Game";
import { Campeonato } from "./Campeonato";

@Entity('plataforma')
export class Plataforma{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: 'varchar', length: 255, nullable: false, unique: true})
    private _name: string;

    @ManyToMany(() => Games)
    @JoinTable({ name: 'game_plataforma' })
    private _Game!: Games[];

    @ManyToMany(() => Campeonato)
    @JoinTable({ name: 'plataforma_campeonatos' })
    private _Campeonato!: Campeonato[];


    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    constructor(name: string){
        this._name = name
    }
}