#!/bin/bash
for i in `seq 1 30`; do
  mongo mongo/rocketchat --eval "rs.initiate({ _id: \"rs0\", members: [ { _id: 0, host: \"localhost:27017\" } ]})" && s=$? && break || s=$?;
  echo "Tried $i times. Waiting 5s...";
  sleep 5;
done;
exit $s