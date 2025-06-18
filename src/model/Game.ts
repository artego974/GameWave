import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Campeonato } from "./Campeonato";
import { Live } from "./Live";

@Entity('games')
export class Games{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    private _name: string;

    @Column({ type: "text"})
    private _description: string;

    @OneToMany(() => Campeonato, (camp) => camp.game)
    campeonato!: Campeonato;

    @OneToMany(() => Live, (live) => live.game)
    live!: Live;


    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter description
     * @return {string}
     */
	public get description(): string {
		return this._description;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter description
     * @param {string} value
     */
	public set description(value: string) {
		this._description = value;
	}


    constructor(name: string, description: string){
        this._name = name;
        this._description = description;
    }
}