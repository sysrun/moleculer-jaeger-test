

- Start "docker-compose up -d"

- Restart service2 "docker-compose restart service2"
- Or rescale up & down "docker-compose scale service2=3"
-  "docker-compose scale service2=1"

Check jaeger logs at "http://localhost:16686"

At some point, the service2 trace will be centered - so out of sync somehow