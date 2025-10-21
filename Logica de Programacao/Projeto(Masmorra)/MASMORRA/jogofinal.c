#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

void menu();
void miniMenu();
void explorar();
void batalha();
void verInventario();
void loja();
void bossFinal();
void usarPocaoAuto();
int desafioCriatura(int posicao);

int posicao;
int MENU;
int hpJogador = 100;
int ouro = 100;
int temEspada = 0;
int temEscudo = 0;
int temChave = 0;
int temArcoEFlecha = 0;
int venceuRegiao[4] = {0, 0, 0, 0};

int inventario[6] = {0};
char nomesItens[6][30] = {
    "pocao",
    "escudo",
    "chave",
    "espada",
    "arco e flecha",
    "bomba de fogo"
};

void verInventario() {
    printf("\n--- Inventario ---\n");
    int vazio = 1;
    for (int i = 0; i < 6; i++) {
        if (inventario[i] > 0) {
            printf("%s x%d\n", nomesItens[i], inventario[i]);
            vazio = 0;
        }
    }
    if (vazio) {
        printf("Vazio.\n");
    }
    printf("-----------------\n");
    int opcaoInventario;
    printf("1- Voltar ao menu\n");
    scanf("%d", &opcaoInventario);

    if(opcaoInventario == 1){
        miniMenu();
    }
}

void usarPocaoAuto() {
    if (hpJogador <= 40 && inventario[0] > 0) {
        int cura = rand() % 21 + 20;
        hpJogador += cura;
        if (hpJogador > 100) hpJogador = 100;
        inventario[0]--;
        printf("\nVoce usou automaticamente uma pocao e recuperou %d de HP! HP atual: %d\n", cura, hpJogador);
    }
}

int desafioCriatura(int posicao) {
    if (posicao == 1) {
        printf("\nDesafio do Urso Negro:\n");
        printf("Enigma: O que e pequeno, redondo e sempre esta em movimento?\n");
        char resposta[100];
        scanf("%s", resposta); 
        if (strcmp(resposta, "bola") == 0) {
            printf("Resposta correta! A criatura esta enfraquecida!\n");
            return 1;
        } else {
            printf("Resposta errada! Voce toma 20 de dano.\n");
            hpJogador -= 20;
            return 0;
        }
    }
    if (posicao == 2) {
        printf("\nDesafio do Fantasma:\n");
        printf("Voce precisa atirar com arco e flecha em um alvo fixo!\n");
        if (temArcoEFlecha) {
            printf("Digite 1 para atirar: ");
            int acao;
            scanf("%d", &acao);
            if (acao == 1) {
                printf("Acerto direto no alvo!\n");
                return 1;
            }
        } else {
            printf("Voce nao tem arco e flecha! Retornando ao menu.\n");
            miniMenu();
        }
    }
    if (posicao == 3) {
        printf("\nDesafio do Gorila Magico:\n");
        printf("Qual e o dobro de 6?\n");
        int resposta;
        scanf("%d", &resposta);
        if (resposta == 12) {
            printf("Resposta correta!\n");
            return 1;
        } else {
            printf("Resposta ridicularmente errada! Voce toma 20 de dano.\n");
            hpJogador -= 20;
            return 0;
        }
    }
    if (posicao == 4) {
        printf("\nDesafio do Dragao de Gelo:\n");
        printf("O que tem quatro patas, mas nao pode andar?\n");
        char resposta[100];
        scanf("%s", resposta); 
        if (strcmp(resposta, "cadeira") == 0) {
            printf("Acertou! A criatura hesita!\n");
            return 1;
        } else {
            printf("Resposta errada! Voce toma 20 de dano.\n");
            hpJogador -= 20;
            return 0;
        }
    }
    return 0;
}

void loja() {
    int escolhaLoja;
    printf("\n--- Loja do Aventureiro ---\n");
    printf("Ouro disponivel: %d\n", ouro);
    printf("1 - Pocao (20 ouro)\n2 - Espada de Fogo (40 ouro)\n3 - Escudo de Aco (35 ouro)\n4 - Arco e Flecha (50 ouro)\n");
    printf("5 - Bomba de Fogo (50 ouro)\n6 - Sair da loja\n");
    printf("Escolha: ");
    scanf("%d", &escolhaLoja);
    scanf("%*c");

    if (escolhaLoja == 1) {
        if (ouro >= 20) {
            inventario[0]++;
            ouro -= 20;
            printf("Voce comprou uma pocao!\n");
        }
    } else if (escolhaLoja == 2) {
        if (ouro >= 40 && !temEspada) {
            inventario[3]++;
            temEspada = 1;
            ouro -= 40;
            printf("Voce comprou uma espada de fogo!\n");
        }
    } else if (escolhaLoja == 3) {
        if (ouro >= 35 && !temEscudo) {
            inventario[1]++;
            temEscudo = 1;
            ouro -= 35;
            printf("Voce comprou um escudo de aco!\n");
        }
    } else if (escolhaLoja == 4) {
        if (ouro >= 50 && !temArcoEFlecha) {
            inventario[4]++;
            temArcoEFlecha = 1;
            ouro -= 50;
            printf("Voce comprou um arco e flecha!\n");
        }
    } else if (escolhaLoja == 5) {
        if (ouro >= 50) {
            inventario[5]++;
            ouro -= 50;
            printf("Voce comprou uma bomba de fogo!\n");
        }
    } else if (escolhaLoja == 6) {
        miniMenu();
    }
    loja();
}

void batalha() {
    int hpInimigo = rand() % 31 + 70;

    if (posicao == 1)
        printf("\nAo sul, o Urso Negro aparece!\n");
    else if (posicao == 2)
        printf("\nA leste, o Fantasma aparece!\n");
    else if (posicao == 3)
        printf("\nAo oeste, o Gorila Magico salta das arvores!\n");
    else if (posicao == 4)
        printf("\nAo norte, um Dragao de Gelo surge rugindo!\n");

    while (hpInimigo > 0 && hpJogador > 0) {
        usarPocaoAuto();
        printf("\nSeu HP: %d | HP inimigo: %d\n", hpJogador, hpInimigo);
        printf("1 - Atacar\n2 - Fugir\n");
        int acao;
        scanf("%d", &acao);
        scanf("%*c");

        if (acao == 1) {
            int dano = 20;
            if (temEspada) {
                dano += 15;
            }
            hpInimigo -= dano;
            printf("Voce causou %d de dano!\n", dano);

            if (hpInimigo <= 0) {
                break;
            }

            int danoInimigo = 30;
            if (temEscudo) {
                danoInimigo -= 10;
            }
            hpJogador -= danoInimigo;
            printf("O inimigo causou %d de dano!\n", danoInimigo);
        } else {
            printf("Voce fugiu!\n");
            miniMenu();
            return;
        }
    }

    if (hpJogador <= 0) {
        printf("\nVoce foi derrotado...\nFim de jogo!\n");
        miniMenu(); 
        return;
    } else {
        printf("\nVoce venceu a criatura!\n");
        int ouroGanho = rand() % 31 + 20;
        ouro += ouroGanho;
        printf("Voce ganhou %d de ouro! Ouro total: %d\n", ouroGanho, ouro);
        if (posicao == 1 && !temChave) {
            inventario[2]++;
            temChave = 1;
            printf("Voce obteve uma chave misteriosa!\n");
        }
        venceuRegiao[posicao - 1] = 1;
    }
    miniMenu();
}

void explorar() {
    printf("\nEscolha uma direcao:\n1 - Sul\n2 - Leste\n3 - Oeste\n4 - Norte\n");
    scanf("%d", &posicao);
    
    desafioCriatura(posicao);
    batalha();
}

void bossFinal() {
    if (!temChave) {
        printf("\nVoce precisa de uma chave para entrar na prisao final.\n");
        return;
    }

    int hpBoss = rand() % 41 + 120;
    printf("\nVoce encontrou o Senhor das Sombras!\n");

    while (hpBoss > 0 && hpJogador > 0) {
        usarPocaoAuto();
        printf("\nSeu HP: %d | HP do chefe: %d\n", hpJogador, hpBoss);
        printf("1 - Atacar\n2 - Fugir\n");
        int acao;
        scanf("%d", &acao);
        scanf("%*c");

        if (acao == 1) {
            int dano = 25;
            if (temEspada) {
                dano += 20;
            }
            hpBoss -= dano;
            printf("Voce causou %d de dano!\n", dano);

            if (hpBoss <= 0) {
                break;
            }

            int danoBoss = 50;
            if (temEscudo) {
                danoBoss -= 15;
            }
            hpJogador -= danoBoss;
            printf("O chefe causou %d de dano!\n", danoBoss);
        } else {
            printf("Voce fugiu!\n");
            miniMenu();
            return;
        }
    }

    if (hpJogador <= 0) {
        printf("\nVoce foi derrotado pelo Senhor das Sombras...\nFim de jogo!\n");
        miniMenu(); 
        return;
    } else {
        printf("\nVoce derrotou o Senhor das Sombras e venceu o jogo!\n");
        return;
    }
}

void miniMenu() {
    printf("\n--- Menu ---\n");

    printf("1 - Explorar\n2 - Loja\n3 - Ver Inventario\n4 - Boss Final\n5 - Sair\n");
    int opcao;
    scanf("%d", &opcao);
    if (opcao == 1) {
        explorar();
    } else if (opcao == 2) {
        loja();
    } else if (opcao == 3) {
        verInventario();
    } else if (opcao == 4) {
        bossFinal();
    } else if (opcao == 5) {
        return; 
    } else {
        printf("Opcao invalida.\n");
        miniMenu();
    }
}

void menu() {
    printf("\n---Bem Vindo ao jogo da exploracao de masmorra!---\n");
    miniMenu();
}



int main() {
    srand(time(NULL));
    posicao = 0;
    MENU = 1;
    menu();
    return 0;
}
