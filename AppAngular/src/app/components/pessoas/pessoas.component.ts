import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from '../../pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  formulario: any;
  tituloFormulario: string;
  pessoas: Pessoa[];
  nomePessoa: string;
  pessoaId: number;

  visibilityTable: boolean = true;
  visibilityForm: boolean = false;

  modalRef: BsModalRef;

  constructor(
    private pessoasService: PessoasService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.pessoasService.GetPeopleAll().subscribe(resultado => {
      this.pessoas = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilityTable = false;
    this.visibilityForm = true;

    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      name: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(pessoaId): void {
    this.visibilityTable = false;
    this.visibilityForm = true;

    this.pessoasService.GetPeopleId(pessoaId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.name} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        name: new FormControl(resultado.name),

        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)
      });
    });
  }

  EnviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    if (pessoa.pessoaId) {
      this.pessoasService.UpdatePeople(pessoa).subscribe(resultado => {
        this.visibilityForm = false;
        this.visibilityTable = true;
        alert('Pessoa atualizada com sucesso');
        this.pessoasService.GetPeopleAll().subscribe(registros => {
          this.pessoas = registros;
        });
      });
    } else {
      this.pessoasService.SavePeople(pessoa).subscribe(resultado => {
        this.visibilityForm = false;
        this.visibilityTable = true;
        alert('Pessoa inserida com sucesso');
        this.pessoasService.GetPeopleAll().subscribe(registros => {
          this.pessoas = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilityTable = true;
    this.visibilityForm = false;
  }

  ExibirConfirmacaoExclusao(
    pessoaId,
    nomePessoa,
    conteudoModal: TemplateRef<any>
  ): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  ExcluirPessoa(pessoaId) {
    this.pessoasService.RemovePeople(pessoaId).subscribe(resultado => {
      this.modalRef.hide();
      alert('Pessoa excluída com sucesso');
      this.pessoasService.GetPeopleAll().subscribe(registros => {
        this.pessoas = registros;
      });
    });
  }
}
