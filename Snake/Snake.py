import curses
from random import randint

# window setup
curses.initscr()
rows = 20
cols = 60
win = curses.newwin(rows, cols, 0, 0)
win.keypad(1)
curses.noecho()
curses.curs_set(0)
win.border(0)
win.nodelay(True)


# data
snake = [(10, 30), (9, 30), (8, 30), (7, 30), (6, 30)] # store snake info in (y, x) format
food = (randint(1, rows - 2), randint(1, cols - 2))


# logic
score = 0
win.addch(food[0], food[1], '#') # show food

ESC = 27 # define ESC as esc key no.
key = curses.KEY_DOWN # snake will start by moving right

while key != ESC:

    win.addstr(0, 2, "Score " + str(score))
    win.timeout(int(150 - (len(snake)) / 5 + len(snake) / 10 % 120)) # increase speed of snake based on snake length

    prev_key = key
    event = win.getch()
    key = event if event != -1 else prev_key

    if key not in [curses.KEY_DOWN, curses.KEY_LEFT, curses.KEY_UP, curses.KEY_RIGHT, ESC]:
        key = prev_key

    # get coordinates of snake head
    y = snake[0][0]
    x = snake[0][1]

    # add new snake head position
    if key == curses.KEY_DOWN:
        y += 1
    elif key == curses.KEY_LEFT:
        x -= 1
    elif key == curses.KEY_UP:
        y -= 1
    elif key == curses.KEY_RIGHT:
        x += 1

    snake.insert(0, (y, x))

    # check if hit border
    if y == 0 or y == rows - 1 or x == 0 or x == cols - 1: break

    # check if snake ate itself
    if snake[0] in snake[1:]: break

    # check if snake ate food
    if snake[0] == food:
        score += len(snake)
        food = ()

        while food == ():
            food = (randint(1, rows - 2), randint(1, cols - 2))

            if food in snake:
                food = ()
    
        win.addch(food[0], food[1], '#')
    else:
        last = snake.pop() # returns & removes last item in arr
        win.addch(last[0], last[1], " ") # change position of tail to space

    win.addch(snake[0][0], snake[0][1], '*') # show snake head



curses.endwin()
print("Final score = " + str(score))