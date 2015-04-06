curl http://d1ilncjhg2cjw.cloudfront.net/hub/assets/FULL_DROP_JAN_2015/small/SONY_FULL_DROP_05_01450.jpg >SONY_FULL_DROP_05_01450.jpg
curl http://d1ilncjhg2cjw.cloudfront.net/hub/assets/FULL_DROP_JAN_2015/small/SONY_FULL_DROP_05_01452.jpg >SONY_FULL_DROP_05_01452.jpg
curl http://d1ilncjhg2cjw.cloudfront.net/hub/assets/FULL_DROP_JAN_2015/small/SONY_FULL_DROP_05_01454.jpg >SONY_FULL_DROP_05_01454.jpg

@echo off
for /l %%i in (1,1,9) do curl http://d1ilncjhg2cjw.cloudfront.net/hub/assets/FULL_DROP_JAN_2015/small/SONY_FULL_DROP_05_0000%%i.jpg >SONY_FULL_DROP_05_0000%%i.jpg
for /l %%i in (10,1,99) do curl http://d1ilncjhg2cjw.cloudfront.net/hub/assets/FULL_DROP_JAN_2015/small/SONY_FULL_DROP_05_000%%i.jpg >SONY_FULL_DROP_05_000%%i.jpg
for /l %%i in (1000,1,1448) do curl http://d1ilncjhg2cjw.cloudfront.net/hub/assets/FULL_DROP_JAN_2015/small/SONY_FULL_DROP_05_0%%i.jpg >SONY_FULL_DROP_05_0%%i.jpg
pause