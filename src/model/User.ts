import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Campeonato } from "./Campeonato";
import { Live } from "./Live";

@Entity('users')
export class User {

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

  @OneToOne(()=> Live,(live) => live.user)
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
}