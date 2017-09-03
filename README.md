# PiReader
Submodule for reading and persisting sensors data via Raspberry Pi.

BPM180 connected to Raspberry is collecting data every hour and sending them to
WeaPer endpoint to persist in DB.

### CronTab usage

For scheduling task edit crontab on pi 

```crontab -e```

put this in and save

```40 * * * * /usr/bin/node /home/PATH_TO_SCRIPT/index.js >> /home/PATH_TO_LOG/cron.log```

Crontab will run fetch script every hour at 40. minute.

Debuging info see cron.log defined up, or

```grep CRON /var/log/syslog```