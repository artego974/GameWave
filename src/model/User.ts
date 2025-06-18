<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Campeonato } from "./Campeonato";
import { Live } from "./Live";
>>>>>>> 089f226b8f26d845078a6ff3296959591947c746

@Entity('users')
export class User {

<<<<<<< HEAD
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:'varchar', length: 100, nullable: false })
    private _name: string;

    @Column({ unique: true })
    private _email: string;

    @Column({type:'varchar', nullable: false })
    private _password: string;

    @Column({type:'varchar', length: 100, nullable: false, unique: true})
    private _nickName: string;

    @Column({type: "decimal"})
    seguidores!: number

    @Column({       })
    seguindo!: number


    constructor(name:string,email:string,password:string,nickName:string){
        this._nickName = nickName
        this._name = name;
        this._email = email;
        this._password = password;
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

=======
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type:"varchar", length: 255, nullable: false, unique:true})
  private _NickName: string;

  @Column({ type:"varchar", length: 255, nullable: false})
  private _Name: string;

  @Column({ type:"varchar", length: 255, nullable: false})
  private _Password: string;

  @Column({ type:"varchar", length: 255, nullable: false, unique:true})
  private _Email: number;

  @Column({ type:"int", default: 0 })
  private _Seguindo: number;

  @Column({ type:"int", default: 0 })
  private _Seguidores: number;

  @ManyToMany(() => Campeonato)
  @JoinTable({ name: 'users_campeonatos' })
  private _Campeonatos!: Campeonato[];

  @OneToMany(()=> Live,(live) => live.user)
  Live!: Live;

    /**
     * Getter Name
     * @return {string}
     */
	public get Name(): string {
		return this._Name;
	}

    /**
     * Setter Name
     * @param {string} value
     */
	public set Name(value: string) {
		this._Name = value;
	}

    /**
     * Getter NickName
     * @return {string}
     */
	public get NickName(): string {
		return this._NickName;
	}

    /**
     * Setter NickName
     * @param {string} value
     */
	public set NickName(value: string) {
		this._NickName = value;
	}

    /**
     * Getter Password
     * @return {string}
     */
	public get Password(): string {
		return this._Password;
	}

    /**
     * Setter Password
     * @param {string} value
     */
	public set Password(value: string) {
		this._Password = value;
	}

    /**
     * Getter Email
     * @return {number}
     */
	public get Email(): number {
		return this._Email;
	}

    /**
     * Setter Email
     * @param {number} value
     */
	public set Email(value: number) {
		this._Email = value;
	}

    /**
     * Getter Seguidores
     * @return {number}
     */
	public get Seguidores(): number {
		return this._Seguidores;
	}

    /**
     * Setter Seguidores
     * @param {number} value
     */
	public set Seguidores(value: number) {
		this._Seguidores = value;
	}

  constructor(NickName:string, Name:string, Password:string, Email:number) {
    this._NickName = NickName;
    this._Name = Name;
    this._Password = Password;
    this._Email = Email;
    this._Seguindo = 0;
    this._Seguidores = 0;
  }
>>>>>>> 089f226b8f26d845078a6ff3296959591947c746
}