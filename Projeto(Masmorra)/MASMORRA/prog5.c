#include <stdio.h>

void exibirMenu() {
    printf("Menu:\n 1 - Opcao um\n 2 - Opcao dois\n 3 - Sair\n");
}

int main() {
    int opcao;

    do {
        exibirMenu();
        printf("Escolha: ");
        scanf("%d", &opcao);

        if (opcao == 1) {
            printf("Voce escolheu a opcao um.\n");
        } else if (opcao == 2) {
            printf("Voce escolheu a opcao dois.\n");
        } else if (opcao != 3) {
            printf("Opcao invalida.\n");
        }

    } while (opcao != 3);


    return 0;
}
