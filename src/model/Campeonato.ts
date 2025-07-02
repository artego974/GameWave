import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity('Campeonato')
export class Campeonato {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    private _name: string;

    @Column({ type: 'text', nullable: true})
    private _description: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    private _game: string;

    @Column({ type: 'int', nullable: false })
    private _numberOfPlayers: number;

    @Column({ type: 'datetime', nullable: false })
    private _timeDate: Date;

    @ManyToOne(()=> User, (host) => host.campeonato)
    host!: User

    @ManyToMany(() => User)
    @JoinTable({ name: 'participantes' })
    participantes!: User[];

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
     * Getter game
     * @return {string}
     */
    public get game(): string {
        return this._game;
    }

    /**
     * Getter numberOfPlayers
     * @return {number}
     */
    public get numberOfPlayers(): number {
        return this._numberOfPlayers;
    }

    /**
     * Getter timeDate
     * @return {Date}
     */
    public get timeDate(): Date {
        return this._timeDate;
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

    /**
     * Setter game
     * @param {string} value
     */
    public set game(value: string) {
        this._game = value;
    }

    /**
     * Setter numberOfPlayers
     * @param {number} value
     */
    public set numberOfPlayers(value: number) {
        this._numberOfPlayers = value;
    }

    /**
     * Setter timeDate
     * @param {Date} value
     */
    public set timeDate(value: Date) {
        this._timeDate = value;
    }
    constructor(name: string, description:string, game:string, numberOfPlayers:number,timeDate: Date) {
        this._name = name;
        this._description = description;
        this._game = game;
        this._numberOfPlayers = numberOfPlayers;
        this._timeDate = timeDate;
    }



}