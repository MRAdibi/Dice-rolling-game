import asyncio
import websockets
import json

class Player:
     def __init__(self,name,id):
        self.id = id
        self.name = name
  
players = []


def get_current_player(id):

    for player in players:
        if player.id == id:
            return player


async def handler(websocket):
    print("connection recived")
    
    if len(players) == 0 :
        players.append(Player("player_1",websocket.id))
    elif len(players) == 1:
        players.append(Player("player_2",websocket.id))
        
    while True:
        print(players)
        current_player = get_current_player(websocket.id)
        try:
            message = await websocket.recv()
            message = json.loads( message)
            if message["type"] == "update_score":
                print("update score")
                await websocket.send({"d":"ggs"})
            elif message["type"] == "update_current_score":
                print("update current score")
                await websocket.send("update_current_score")
            elif message["type"] == "switch_player":
                print("update switch player")
            elif message["type"] == "get_token":
                await websocket.send(json.dumps({"type":"token","data":"data"}))
                #generate_token()
                
        except Exception as e:
            print(e)
            break 
      
      
async def main():
    async with websockets.serve(handler, "localhost", 8001):
        await asyncio.Future()  # run forever

asyncio.run(main())

