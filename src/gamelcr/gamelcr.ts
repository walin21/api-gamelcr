interface Player {
    chips: number;
    rolls: number;
}

type Roll = 'L' | 'C' | 'R' | '.';

function playLCR(numPlayers: number, rolls: string): string {
    const players: Player[] = Array.from({ length: numPlayers }, () => ({ chips: 3, rolls: 3 }));
    let centerChips = 0;
    let currentPlayerIndex = 0;
    let winnerIndex: number | undefined;

    for (const roll of rolls) {
        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.chips === 0) {
            currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers;
            continue;
        }
        if (roll === 'L') {
            const targetIndex = (currentPlayerIndex + numPlayers + 1) % numPlayers;
            players[targetIndex].chips++;
            currentPlayer.chips--;
        } else if (roll === 'C') {
            centerChips++;
            currentPlayer.chips--;
        } else if (roll === 'R') {
            const targetIndex = (currentPlayerIndex + numPlayers - 1) % numPlayers;
            players[targetIndex].chips++;
            currentPlayer.chips--;
        }
        if (currentPlayer.rolls > 0) {
            currentPlayer.rolls--;
        }
        if (currentPlayer.chips === 0) {
            currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers;
            if (players.filter(p => p.chips > 0).length === 1) {
                winnerIndex = players.findIndex(p => p.chips > 0);
                break;
            }
        }
        else if (currentPlayer.rolls != 0) {
            currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers;
            currentPlayer.rolls = currentPlayer.chips >= 3 ? 3 : currentPlayer.chips;
        }
    }

    const playerLines = players.map((player, i) => {
        const chipsStr = `${player.chips}${winnerIndex === i ? '(W)' : (i === currentPlayerIndex ? '(*)' : '')}`;
        return `Player ${i + 1}: ${chipsStr}`;
    }).join('\n');
    return `Game 1:\n${playerLines}\nCenter: ${centerChips}\n`;
}

export function initGame(value: String){
    let data = value.split(" ");
    if (data.length === 2 && (Number(data[0]) >= 3 && Number(data[0]) <= 10)){
        return playLCR(Number(data[0]), data[1])
    }
    return "El valor de entrada es incorrecto. Intente ingresando un valor válido."
}