let Left, Right, LeftNum, RightNum, TempLeftNum, TempRightNum, ComputerLeftNum, ComputerRightNum, GameOverToStop, PlayerExactFiveAttack, PlayerExactFiveSplit, ComputerExactFiveAttack, ComputerExactFiveSplit;

// Turn on the interface of game tutorial.
function TurnOnTutorial() {
    document.getElementById("overlay").style.display = "block";
}

// Turn off the interface of game tutorial.
function TurnOffTutorial() {
    document.getElementById("overlay").style.display = "none";
}

// Check whether game is over or not.
function GameOver() {
    if (ComputerLeftNum == 0 && ComputerRightNum == 0) {
        document.getElementById("middle").innerHTML = "Player Wins!";
        document.getElementById("imgBL").removeEventListener("click", ChangeImgL);
        document.getElementById("imgBR").removeEventListener("click", ChangeImgR);
        document.getElementById("imgTL").removeEventListener("click", ComputerL);
        document.getElementById("imgTR").removeEventListener("click", ComputerR);
        document.getElementById("game").value = "gamemode";
        document.getElementById("game").disabled = false;
        clearInterval(GameOverToStop);
    } else if (LeftNum == 0 && RightNum == 0) {
        document.getElementById("middle").innerHTML = "Computer Wins!";
        document.getElementById("imgBL").removeEventListener("click", ChangeImgL);
        document.getElementById("imgBR").removeEventListener("click", ChangeImgR);
        document.getElementById("imgTL").removeEventListener("click", ComputerL);
        document.getElementById("imgTR").removeEventListener("click", ComputerR);
        document.getElementById("game").value = "gamemode";
        document.getElementById("game").disabled = false;
        clearInterval(GameOverToStop);
    } else if (ComputerExactFiveAttack && ComputerExactFiveSplit) {
        document.getElementById("middle").innerHTML = "Player Wins!";
        document.getElementById("imgBL").removeEventListener("click", ChangeImgL);
        document.getElementById("imgBR").removeEventListener("click", ChangeImgR);
        document.getElementById("imgTL").removeEventListener("click", ComputerL);
        document.getElementById("imgTR").removeEventListener("click", ComputerR);
        document.getElementById("game").value = "gamemode";
        document.getElementById("game").disabled = false;
        clearInterval(GameOverToStop);        
    } else if (PlayerExactFiveAttack && PlayerExactFiveSplit) {
        document.getElementById("middle").innerHTML = "Computer Wins!";
        document.getElementById("imgBL").removeEventListener("click", ChangeImgL);
        document.getElementById("imgBR").removeEventListener("click", ChangeImgR);
        document.getElementById("imgTL").removeEventListener("click", ComputerL);
        document.getElementById("imgTR").removeEventListener("click", ComputerR);
        document.getElementById("game").value = "gamemode";
        document.getElementById("game").disabled = false;
        clearInterval(GameOverToStop);
    }
}

// Computer attacks Player in the game of "Rollover".
function PlayerRollover(Num, Hand) {
    switch (Hand) {
        case "L":
            let imgL = document.getElementById("imgBL");
            Num %= 5;
            imgL.src = `./image/BottomLeft/${Num}.png`;
            LeftNum = Num;
            break;
        case "R":
            let imgR = document.getElementById("imgBR");
            Num %= 5;
            imgR.src = `./image/BottomRight/${Num}.png`;
            RightNum = Num;
            break;
    }
}

// Computer attacks Player in the game of "Over 5".
function PlayerOverFive(Num, Hand) {
    switch (Hand) {
        case "L":
            let imgL = document.getElementById("imgBL");
            if (Num >= 5) {
                imgL.src = "./image/BottomLeft/0.png";
                LeftNum = 0;
            } else {
                imgL.src = `./image/BottomLeft/${Num}.png`;
                LeftNum = Num;
            }
            break;
        case "R":
            let imgR = document.getElementById("imgBR");
            if (Num >= 5) {
                imgR.src = "./image/BottomRight/0.png";
                RightNum = 0;
            } else {
                imgR.src = `./image/BottomRight/${Num}.png`;
                RightNum = Num;
            }
            break;
    }
}

// Computer attacks Player in the game of "Exact 5".
function PlayerExactFive(Num, Hand) {
    switch (Hand) {
        case "L":
            let imgL = document.getElementById("imgBL");
            Num %= 5;
            imgL.src = `./image/BottomLeft/${Num}.png`;
            LeftNum = Num;
            break;
        case "R":
            let imgR = document.getElementById("imgBR");
            Num %= 5;
            imgR.src = `./image/BottomRight/${Num}.png`;
            RightNum = Num;
            break;
    }
    WhetherAttackOrSplit("P");
    if (PlayerExactFiveAttack && PlayerExactFiveSplit) GameOver();
}

// Check whether Computer can attack the left hand of Player in the game of "Exact 5".
function WhetherAttackExactFiveL(Num) {
    if ((ComputerLeftNum + LeftNum) <= 5 && (ComputerRightNum + LeftNum) <= 5) PlayerExactFive(Num, "L");
    else if ((ComputerLeftNum + LeftNum) > 5 && (ComputerRightNum + LeftNum) <= 5) PlayerExactFive(ComputerRightNum + LeftNum, "L");
    else if ((ComputerLeftNum + LeftNum) <= 5 && (ComputerRightNum + LeftNum) > 5) PlayerExactFive(ComputerLeftNum + LeftNum, "L");
    else WhetherAttackExactFiveR(Math.max(ComputerLeftNum + RightNum, ComputerRightNum + RightNum));
}

// Check whether Computer can attack the right hand of Player in the game of "Exact 5".
function WhetherAttackExactFiveR(Num) {
    if ((ComputerLeftNum + RightNum) <= 5 && (ComputerRightNum + RightNum) <= 5) PlayerExactFive(Num, "R");
    else if ((ComputerLeftNum + RightNum) > 5 && (ComputerRightNum + RightNum) <= 5) PlayerExactFive(ComputerRightNum + RightNum, "R");
    else if ((ComputerLeftNum + RightNum) <= 5 && (ComputerRightNum + RightNum) > 5) PlayerExactFive(ComputerLeftNum + RightNum, "R");
    else WhetherAttackExactFiveL(Math.max(ComputerLeftNum + LeftNum, ComputerRightNum + LeftNum));
}

// Computer attacks Player.
function Attack() {
    let Mode = document.getElementById("game").value;
    let ComputerMaxNum = Math.max(ComputerLeftNum, ComputerRightNum);
    if (ComputerMaxNum == 0) GameOver();
    else {
        let MaxNum = Math.max(LeftNum, RightNum);
        let TempNum = ComputerMaxNum + MaxNum;
        if (LeftNum >= RightNum) {
            switch (Mode) {
                case "rollover":
                    PlayerRollover(TempNum, "L");
                    break;
                case "over5":
                    PlayerOverFive(TempNum, "L");
                    break;
                case "exact5":
                    WhetherAttackExactFiveL(TempNum);
                    break;
            }
        } else {
            switch (Mode) {
                case "rollover":
                    PlayerRollover(TempNum, "R");
                    break;
                case "over5":
                    PlayerOverFive(TempNum, "R");
                    break;
                case "exact5":
                    WhetherAttackExactFiveR(TempNum);
                    break;
            }
        }
    }
}

// Computer splits fingers.
function Split() {
    let imgL = document.getElementById("imgTL");
    let imgR = document.getElementById("imgTR");
    let Sum = ComputerLeftNum + ComputerRightNum;
    switch (Sum) {
        case 0:
            Attack();
            break;
        case 1:
            Attack();
            break;
        case 2:
            if (ComputerLeftNum != ComputerRightNum) {
                imgL.src = "./image/TopLeft/1.png";
                imgR.src = "./image/TopRight/1.png";
                ComputerLeftNum = 1;
                ComputerRightNum = 1;
            } else {
                imgL.src = "./image/TopLeft/2.png";
                imgR.src = "./image/TopRight/0.png";
                ComputerLeftNum = 2;
                ComputerRightNum = 0;
            }
            break;
        case 3:
            if (Math.abs(ComputerLeftNum - ComputerRightNum) == 1) {
                imgL.src = "./image/TopLeft/3.png";
                imgR.src = "./image/TopRight/0.png";
                ComputerLeftNum = 3;
                ComputerRightNum = 0;
            } else {
                imgL.src = "./image/TopLeft/2.png";
                imgR.src = "./image/TopRight/1.png";
                ComputerLeftNum = 2;
                ComputerRightNum = 1;
            }
            break;
        case 4:
            if (ComputerLeftNum == ComputerRightNum) {
                if (Math.random() < 0.5) {
                    imgL.src = "./image/TopLeft/4.png";
                    imgR.src = "./image/TopRight/0.png";
                    ComputerLeftNum = 4;
                    ComputerRightNum = 0;
                } else {
                    imgL.src = "./image/TopLeft/3.png";
                    imgR.src = "./image/TopRight/1.png";
                    ComputerLeftNum = 3;
                    ComputerRightNum = 1;
                }
            } else if (Math.abs(ComputerLeftNum - ComputerRightNum) == 2) {
                if (Math.random() < 0.5) {
                    imgL.src = "./image/TopLeft/4.png";
                    imgR.src = "./image/TopRight/0.png";
                    ComputerLeftNum = 4;
                    ComputerRightNum = 0;
                } else {
                    imgL.src = "./image/TopLeft/2.png";
                    imgR.src = "./image/TopRight/2.png";
                    ComputerLeftNum = 2;
                    ComputerRightNum = 2;
                }
            } else {
                if (Math.random() < 0.5) {
                    imgL.src = "./image/TopLeft/3.png";
                    imgR.src = "./image/TopRight/1.png";
                    ComputerLeftNum = 3;
                    ComputerRightNum = 1;
                } else {
                    imgL.src = "./image/TopLeft/2.png";
                    imgR.src = "./image/TopRight/2.png";
                    ComputerLeftNum = 2;
                    ComputerRightNum = 2;
                }
            }
            break;
        case 5:
            if (Math.abs(ComputerLeftNum - ComputerRightNum) == 1) {
                imgL.src = "./image/TopLeft/4.png";
                imgR.src = "./image/TopRight/1.png";
                ComputerLeftNum = 4;
                ComputerRightNum = 1;
            } else {
                imgL.src = "./image/TopLeft/3.png";
                imgR.src = "./image/TopRight/2.png";
                ComputerLeftNum = 3;
                ComputerRightNum = 2;
            }
            break;
        case 6:
            if (ComputerLeftNum != ComputerRightNum) {
                imgL.src = "./image/TopLeft/3.png";
                imgR.src = "./image/TopRight/3.png";
                ComputerLeftNum = 3;
                ComputerRightNum = 3;
            } else {
                imgL.src = "./image/TopLeft/4.png";
                imgR.src = "./image/TopRight/2.png";
                ComputerLeftNum = 4;
                ComputerRightNum = 2;
            }
            break;
        case 7:
            Attack();
            break;
        case 8:
            Attack();
            break;
    }
    WhetherAttackOrSplit("P");
    if (PlayerExactFiveAttack && PlayerExactFiveSplit) GameOver();
}

// Select or unselect the left hand of Player.
function ChangeImgL() {
    let imgL = document.getElementById("imgBL");
    let Num = imgL.src.split("/").pop();
    switch (Num) {
        case "0.png":
            imgL.src = "./image/BottomLeft/0R.png";
            LeftNum = 0;
            Left = true;
            break;
        case "0R.png":
            imgL.src = "./image/BottomLeft/0.png";
            Left = false;
            break;
        case "1.png":
            imgL.src = "./image/BottomLeft/1R.png";
            LeftNum = 1;
            Left = true;
            break;
        case "1R.png":
            imgL.src = "./image/BottomLeft/1.png";
            Left = false;
            break;
        case "2.png":
            imgL.src = "./image/BottomLeft/2R.png";
            LeftNum = 2;
            Left = true;
            break;
        case "2R.png":
            imgL.src = "./image/BottomLeft/2.png";
            Left = false;
            break;
        case "3.png":
            imgL.src = "./image/BottomLeft/3R.png";
            LeftNum = 3;
            Left = true;
            break;
        case "3R.png":
            imgL.src = "./image/BottomLeft/3.png";
            Left = false;
            break;
        case "4.png":
            imgL.src = "./image/BottomLeft/4R.png";
            LeftNum = 4;
            Left = true;
            break;
        case "4R.png":
            imgL.src = "./image/BottomLeft/4.png";
            Left = false;
            break;
    }
    if (Left && Right) {
        document.getElementById("middle").innerHTML = "";
        document.getElementById("split-panel").style.display = "block";
        TempLeftNum = LeftNum;
        TempRightNum = RightNum;
        document.getElementById("imgBL").removeEventListener("click", ChangeImgL);
        document.getElementById("imgBR").removeEventListener("click", ChangeImgR);
        PossibleSplit();
    } else document.getElementById("split-panel").style.display = "none";
}

// Select or unselect the right hand of Player.
function ChangeImgR() {
    let imgR = document.getElementById("imgBR");
    let Num = imgR.src.split("/").pop();
    switch (Num) {
        case "0.png":
            imgR.src = "./image/BottomRight/0R.png";
            RightNum = 0;
            Right = true;
            break;
        case "0R.png":
            imgR.src = "./image/BottomRight/0.png";
            Right = false;
            break;
        case "1.png":
            imgR.src = "./image/BottomRight/1R.png";
            RightNum = 1;
            Right = true;
            break;
        case "1R.png":
            imgR.src = "./image/BottomRight/1.png";
            Right = false;
            break;
        case "2.png":
            imgR.src = "./image/BottomRight/2R.png";
            RightNum = 2;
            Right = true;
            break;
        case "2R.png":
            imgR.src = "./image/BottomRight/2.png";
            Right = false;
            break;
        case "3.png":
            imgR.src = "./image/BottomRight/3R.png";
            RightNum = 3;
            Right = true;
            break;
        case "3R.png":
            imgR.src = "./image/BottomRight/3.png";
            Right = false;
            break;
        case "4.png":
            imgR.src = "./image/BottomRight/4R.png";
            RightNum = 4;
            Right = true;
            break;
        case "4R.png":
            imgR.src = "./image/BottomRight/4.png";
            Right = false;
            break;
    }
    if (Left && Right) {
        document.getElementById("middle").innerHTML = "";
        document.getElementById("split-panel").style.display = "block";
        TempLeftNum = LeftNum;
        TempRightNum = RightNum;
        document.getElementById("imgBL").removeEventListener("click", ChangeImgL);
        document.getElementById("imgBR").removeEventListener("click", ChangeImgR);
        PossibleSplit();
    } else document.getElementById("split-panel").style.display = "none";
}

// Player attacks Computer in the game of "Rollover".
function Rollover(Num, Hand) {
    switch (Hand) {
        case "L":
            let imgL = document.getElementById("imgTL");
            Num %= 5;
            imgL.src = `./image/TopLeft/${Num}.png`;
            ComputerLeftNum = Num;
            document.getElementById("middle").innerHTML = "";
            break;
        case "R":
            let imgR = document.getElementById("imgTR");
            Num %= 5;
            imgR.src = `./image/TopRight/${Num}.png`;
            ComputerRightNum = Num;
            document.getElementById("middle").innerHTML = "";
            break;
    }
}

// Player attacks Computer in the game of "Over 5".
function OverFive(Num, Hand) {
    switch (Hand) {
        case "L":
            let imgL = document.getElementById("imgTL");
            if (Num >= 5) {
                imgL.src = "./image/TopLeft/0.png";
                ComputerLeftNum = 0;
            } else {
                imgL.src = `./image/TopLeft/${Num}.png`;
                ComputerLeftNum = Num;
            }
            document.getElementById("middle").innerHTML = "";
            break;
        case "R":
            let imgR = document.getElementById("imgTR");
            if (Num >= 5) {
                imgR.src = "./image/TopRight/0.png";
                ComputerRightNum = 0;
            } else {
                imgR.src = `./image/TopRight/${Num}.png`;
                ComputerRightNum = Num;
            }
            document.getElementById("middle").innerHTML = "";
            break;
    }
}

// Check whether being able to attack or split in the game of "Exact 5".
function WhetherAttackOrSplit(players) {
    switch (players) {
        case "P":
            PlayerExactFiveAttack = false;
            PlayerExactFiveSplit = false;
            if (Math.min(LeftNum + ComputerLeftNum, LeftNum + ComputerRightNum, RightNum + ComputerLeftNum, RightNum + ComputerRightNum) > 5) PlayerExactFiveAttack = true;
            else if (ComputerLeftNum == 0 && Math.min(LeftNum + ComputerRightNum, RightNum + ComputerRightNum) > 5) PlayerExactFiveAttack = true;
            else if (ComputerRightNum == 0 && Math.min(LeftNum + ComputerLeftNum, RightNum + ComputerLeftNum) > 5) PlayerExactFiveAttack = true;
            else if (LeftNum == 0 && Math.min(RightNum + ComputerLeftNum, RightNum + ComputerRightNum) > 5) PlayerExactFiveAttack = true;
            else if (RightNum == 0 && Math.min(LeftNum + ComputerLeftNum, LeftNum + ComputerRightNum) > 5) PlayerExactFiveAttack = true;
            if (LeftNum + RightNum == 7 || LeftNum + RightNum == 8) PlayerExactFiveSplit = true;
            break;
        case "C":
            ComputerExactFiveAttack = false;
            ComputerExactFiveSplit = false;
            if (Math.min(LeftNum + ComputerLeftNum, LeftNum + ComputerRightNum, RightNum + ComputerLeftNum, RightNum + ComputerRightNum) > 5) ComputerExactFiveAttack = true;
            else if (LeftNum == 0 && Math.min(RightNum + ComputerLeftNum, RightNum + ComputerRightNum) > 5) ComputerExactFiveAttack = true;
            else if (RightNum == 0 && Math.min(LeftNum + ComputerLeftNum, LeftNum + ComputerRightNum) > 5) ComputerExactFiveAttack = true;
            else if (ComputerLeftNum == 0 && Math.min(LeftNum + ComputerRightNum, RightNum + ComputerRightNum) > 5) ComputerExactFiveAttack = true;
            else if (ComputerRightNum == 0 && Math.min(LeftNum + ComputerLeftNum, RightNum + ComputerLeftNum) > 5) ComputerExactFiveAttack = true;
            if (ComputerLeftNum + ComputerRightNum == 7 || ComputerLeftNum + ComputerRightNum == 8) ComputerExactFiveSplit = true;
            break;
    }
}

// Player attacks Computer in the game of "Exact 5".
function ExactFive(Num, Hand) {
    let AttackSuccess = true;
    switch (Hand) {
        case "L":
            let imgL = document.getElementById("imgTL");
            if (Num > 5) {
                document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
                AttackSuccess = false;
            } else {
                Num %= 5;
                imgL.src = `./image/TopLeft/${Num}.png`;
                ComputerLeftNum = Num;
                document.getElementById("middle").innerHTML = "";
            }
            break;
        case "R":
            let imgR = document.getElementById("imgTR");
            if (Num > 5) {
                document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
                AttackSuccess = false;
            } else {
                Num %= 5;
                imgR.src = `./image/TopRight/${Num}.png`;
                ComputerRightNum = Num;
                document.getElementById("middle").innerHTML = "";
            }
            break;
    }
    return AttackSuccess;
}

// Player attacks the left hand of Computer.
function ComputerL() {
    let Mode = document.getElementById("game").value;
    let Num = document.getElementById("imgTL").src.split("/").pop();
    let TempNum;
    let IllegalMove = false;
    if (Left && !Right) {
        switch (Num) {
            case "0.png":
                document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
                ChangeImgL();
                IllegalMove = true;
                break;
            case "1.png":
                TempNum = LeftNum + 1;
                break;
            case "2.png":
                TempNum = LeftNum + 2;
                break;
            case "3.png":
                TempNum = LeftNum + 3;
                break;
            case "4.png":
                TempNum = LeftNum + 4;
                break;
        }
        if (LeftNum == 0 && !IllegalMove) {
            document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
            ChangeImgL();
            IllegalMove = true;
        }
        if (!IllegalMove) {
            switch (Mode) {
                case "rollover":
                    Rollover(TempNum, "L");
                    ChangeImgL();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "over5":
                    OverFive(TempNum, "L");
                    ChangeImgL();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "exact5":
                    if (ExactFive(TempNum, "L")) {
                        ChangeImgL();
                        WhetherAttackOrSplit("C");
                        if (ComputerExactFiveAttack && ComputerExactFiveSplit) GameOver();
                        else if (ComputerExactFiveAttack && !ComputerExactFiveSplit) Split();
                        else if (!ComputerExactFiveAttack && ComputerExactFiveSplit) Attack();
                        else {
                            if (Math.random < 0.5) Attack();
                            else Split();
                        }
                    } else ChangeImgL();
                    break;
            }
        }
    } else if (Right && !Left) {
        switch (Num) {
            case "0.png":
                document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
                ChangeImgR();
                IllegalMove = true;
                break;
            case "1.png":
                TempNum = RightNum + 1;
                break;
            case "2.png":
                TempNum = RightNum + 2;
                break;
            case "3.png":
                TempNum = RightNum + 3;
                break;
            case "4.png":
                TempNum = RightNum + 4;
                break;
        }
        if (RightNum == 0 && !IllegalMove) {
            document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
            ChangeImgR();
            IllegalMove = true;
        }
        if (!IllegalMove) {
            switch (Mode) {
                case "rollover":
                    Rollover(TempNum, "L");
                    ChangeImgR();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "over5":
                    OverFive(TempNum, "L");
                    ChangeImgR();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "exact5":
                    if (ExactFive(TempNum, "L")) {
                        ChangeImgR();
                        WhetherAttackOrSplit("C");
                        if (ComputerExactFiveAttack && ComputerExactFiveSplit) GameOver();
                        else if (ComputerExactFiveAttack && !ComputerExactFiveSplit) Split();
                        else if (!ComputerExactFiveAttack && ComputerExactFiveSplit) Attack();
                        else {
                            if (Math.random < 0.5) Attack();
                            else Split();
                        }
                    } else ChangeImgR();
                    break;
            }
        }
    }
}

// Player attacks the right hand of Computer.
function ComputerR() {
    let Mode = document.getElementById("game").value;
    let Num = document.getElementById("imgTR").src.split("/").pop();
    let TempNum;
    let IllegalMove = false;
    if (Left && !Right) {
        switch (Num) {
            case "0.png":
                document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
                ChangeImgL();
                IllegalMove = true;
                break;
            case "1.png":
                TempNum = LeftNum + 1;
                break;
            case "2.png":
                TempNum = LeftNum + 2;
                break;
            case "3.png":
                TempNum = LeftNum + 3;
                break;
            case "4.png":
                TempNum = LeftNum + 4;
                break;
        }
        if (LeftNum == 0 && !IllegalMove) {
            document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
            ChangeImgL();
            IllegalMove = true;
        }
        if (!IllegalMove) {
            switch (Mode) {
                case "rollover":
                    Rollover(TempNum, "R");
                    ChangeImgL();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "over5":
                    OverFive(TempNum, "R");
                    ChangeImgL();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "exact5":
                    if (ExactFive(TempNum, "R")) {
                        ChangeImgL();
                        WhetherAttackOrSplit("C");
                        if (ComputerExactFiveAttack && ComputerExactFiveSplit) GameOver();
                        else if (ComputerExactFiveAttack && !ComputerExactFiveSplit) Split();
                        else if (!ComputerExactFiveAttack && ComputerExactFiveSplit) Attack();
                        else {
                            if (Math.random < 0.5) Attack();
                            else Split();
                        }
                    } else ChangeImgL();
                    break;
            }
        }
    } else if (Right && !Left) {
        switch (Num) {
            case "0.png":
                document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
                ChangeImgR();
                IllegalMove = true;
                break;
            case "1.png":
                TempNum = RightNum + 1;
                break;
            case "2.png":
                TempNum = RightNum + 2;
                break;
            case "3.png":
                TempNum = RightNum + 3;
                break;
            case "4.png":
                TempNum = RightNum + 4;
                break;
        }
        if (RightNum == 0 && !IllegalMove) {
            document.getElementById("middle").innerHTML = "It is an illegal move. Please try again!";
            ChangeImgR();
            IllegalMove = true;
        }
        if (!IllegalMove) {
            switch (Mode) {
                case "rollover":
                    Rollover(TempNum, "R");
                    ChangeImgR();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "over5":
                    OverFive(TempNum, "R");
                    ChangeImgR();
                    if (Math.random < 0.5) Attack();
                    else Split();
                    break;
                case "exact5":
                    if (ExactFive(TempNum, "R")) {
                        ChangeImgR();
                        WhetherAttackOrSplit("C");
                        if (ComputerExactFiveAttack && ComputerExactFiveSplit) GameOver();
                        else if (ComputerExactFiveAttack && !ComputerExactFiveSplit) Split();
                        else if (!ComputerExactFiveAttack && ComputerExactFiveSplit) Attack();
                        else {
                            if (Math.random < 0.5) Attack();
                            else Split();
                        }
                    } else ChangeImgR();
                    break;
            }
        }
    }
}

// Enable or disable the buttons according to the possible splits.
function PossibleSplit() {
    let Sum = TempLeftNum + TempRightNum;
    switch (Sum) {
        case 0:
        case 1:
        case 7:
        case 8:
            document.getElementById("to-left").disabled = true;
            document.getElementById("to-right").disabled = true;
            document.getElementById("ok").disabled = true;
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            if (TempLeftNum == 0) {
                document.getElementById("to-left").disabled = false;
                document.getElementById("to-right").disabled = true;
            } else if (TempRightNum == 0) {
                document.getElementById("to-left").disabled = true;
                document.getElementById("to-right").disabled = false;
            } else {
                document.getElementById("to-left").disabled = false;
                document.getElementById("to-right").disabled = false;
            }
            if (LeftNum == RightNum) {
                if (TempLeftNum == TempRightNum) document.getElementById("ok").disabled = true;
                else document.getElementById("ok").disabled = false;
            } else {
                if (LeftNum == TempLeftNum && RightNum == TempRightNum) document.getElementById("ok").disabled = true;
                else if (TempLeftNum == RightNum && TempRightNum == LeftNum) document.getElementById("ok").disabled = true;
                else document.getElementById("ok").disabled = false;
            }
            break;
    }
}

// Player moves 1 finger from the right to the left hand.
function SplitToLeft() {
    let imgL = document.getElementById("imgBL");
    let imgR = document.getElementById("imgBR");
    TempLeftNum++;
    TempRightNum--;
    imgL.src = `./image/BottomLeft/${TempLeftNum}R.png`;
    imgR.src = `./image/BottomRight/${TempRightNum}R.png`;
    PossibleSplit();

}

// Player moves 1 finger from the left to the right hand.
function SplitToRight() {
    let imgL = document.getElementById("imgBL");
    let imgR = document.getElementById("imgBR");
    TempLeftNum--;
    TempRightNum++;
    imgL.src = `./image/BottomLeft/${TempLeftNum}R.png`;
    imgR.src = `./image/BottomRight/${TempRightNum}R.png`;
    PossibleSplit();
}

// Player confirms the final splits.
function SplitOK() {
    LeftNum = TempLeftNum;
    RightNum = TempRightNum;
    ChangeImgL();
    ChangeImgR();
    document.getElementById("imgBL").addEventListener("click", ChangeImgL);
    document.getElementById("imgBR").addEventListener("click", ChangeImgR);
    if (document.getElementById("game").value == "exact5") {
        WhetherAttackOrSplit("C");
        if (ComputerExactFiveAttack && ComputerExactFiveSplit) GameOver();
        else if (ComputerExactFiveAttack && !ComputerExactFiveSplit) Split();
        else if (!ComputerExactFiveAttack && ComputerExactFiveSplit) Attack();
        else {
            if (Math.random < 0.5) Attack();
            else Split();
        }
    } else {
        if (Math.random < 0.5) Attack();
        else Split();
    }
}

// Player cancels the splits.
function SplitCancel() {
    let imgL = document.getElementById("imgBL");
    let imgR = document.getElementById("imgBR");
    imgL.src = `./image/BottomLeft/${LeftNum}.png`;
    imgR.src = `./image/BottomRight/${RightNum}.png`;
    Left = false;
    Right = false;
    document.getElementById("split-panel").style.display = "none";
    document.getElementById("imgBL").addEventListener("click", ChangeImgL);
    document.getElementById("imgBR").addEventListener("click", ChangeImgR);
}

// Select the game mode of Chopsticks.
function GameMode() {
    Left = false;
    Right = false;
    PlayerExactFiveAttack = false;
    PlayerExactFiveSplit = false;
    ComputerExactFiveAttack = false;
    ComputerExactFiveSplit = false;
    LeftNum = 1;
    RightNum = 1;
    ComputerLeftNum = 1;
    ComputerRightNum = 1;
    document.getElementById("imgBL").src = "./image/BottomLeft/1.png";
    document.getElementById("imgBR").src = "./image/BottomRight/1.png";
    document.getElementById("imgTL").src = "./image/TopLeft/1.png";
    document.getElementById("imgTR").src = "./image/TopRight/1.png";
    document.getElementById("middle").innerHTML = "";
    GameOverToStop = setInterval(GameOver, 300);
    document.getElementById("imgBL").addEventListener("click", ChangeImgL);
    document.getElementById("imgBR").addEventListener("click", ChangeImgR);
    document.getElementById("imgTL").addEventListener("click", ComputerL);
    document.getElementById("imgTR").addEventListener("click", ComputerR);
    document.getElementById("game").disabled = true;
}