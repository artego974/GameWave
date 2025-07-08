import { Entity, PrimaryGeneratedColumn, Column, OneToMany,BeforeInsert, BeforeUpdate, AfterLoad, ManyToMany,ManyToOne, JoinTable, OneToOne} from "typeorm";
import { Campeonato } from "./Campeonato";
import { Live } from "./Live";
import bcrypt from "bcryptjs";
import { Participantes } from "./Participantes";

@Entity('users')
export class User {
  
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:'varchar', length: 100, nullable: false })
    private _name: string;

    @Column({ unique: true })
    private _email: string;

    @Column({type:'varchar', nullable: false })
    private _password: string;

    @Column({type:'varchar', length: 100, nullable: false, unique: true})
    _nickName: string;

    @Column({type: "int", default: 0})
    seguidores!: number

    @Column({  type: "int", default: 0})
    seguindo!: number

    @OneToMany( () => Live, (live) => live.user)
    Live!: Live;

    @OneToMany(()=> Campeonato, (campeonato) => campeonato.host)
    campeonato!: Campeonato

    @ManyToOne(() => Participantes, (participantes) => participantes.campeonato)
    participantes!: Participantes;

    private originalPassword: string

    constructor(name:string,email:string,password:string,nickName:string){
        this._nickName = nickName
        this._name = name;
        this._email = email;
        this._password = password;
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

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter password
     * @return {string}
     */
	public get password(): string {
		return this._password;
	}

    /**
     * Getter nickName
     * @return {string}
     */
	public get nickName(): string {
		return this._nickName;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter password
     * @param {string} value
     */
	public set password(value: string) {
		this._password = value;
	}

    /**
     * Setter nickName
     * @param {string} value
     */
	public set nickName(value: string) {
		this._nickName = value;
	}

}