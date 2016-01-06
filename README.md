# osu!Watcherbot

Welcome to firedigger's osuWatcherBot!  
This tool is intended to allow you to keep track of several players' performance and map scores with a single command.  

Avaiable commands  

 - !help - show this help
 - !watch <player_name>
 - !watch b <beatmap_id>
 - !unwatch <identifier>
 - !update - get teh feed
 - !list - list all the current watchers
 - !list_states - list all the current watchers along with their states
 - !clear - unwatch everything
 - !clear_states - clear the saved states for your watchers (doesn't delete any watchers)
 - !pp - Return pp for your last play (just an extra small feature)

Example of use (what is working right now):  
------------------------------------------

>user: !watch hvick225  
>bot: Watching hvick225  
>user: !watch Cookiezi  
>bot: Watching Cookiezi  
>user: !watch b 252238  
>bot: Watching Map 252238  
>user: !update  
>bot: hvick225 has 11111 pp and 1 rank  
>bot: cookiezi has +inf pp and 0 rank  
>bot: Tatsh - IMAGE -MATERIAL- <Version 0> [Scorpior]: Cookiezi S rank 99% achieved on 26-12-2015 nomod  
>user: !update  
>bot: hvick225's state hasn't changed  
>bot: cookiezi has gained 500.03 pp and gain 10 ranks!  
>bot: Tatsh - IMAGE -MATERIAL- <Version 0> [Scorpior]: new #1 score by Cookiezi +HDHR achieved on 2017-01-01  
