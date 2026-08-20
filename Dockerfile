
FROM registry.access.redhat.com/ubi9/nodejs-22 AS builder
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm ci                      # instala TODO, incluidas devDependencies
COPY . .
RUN npx ng build --configuration production


FROM registry.access.redhat.com/ubi9/nginx-124
COPY --from=builder /opt/app-root/src/dist/nueva-vision/browser /opt/app-root/src/
CMD ["nginx", "-g", "daemon off;"]
