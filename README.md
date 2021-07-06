# **Car Auction UI**

## **Technologies**

* Angular5
* NodeJS
* Yarn
* TypeScript

## **Prerequisites**

* NodeJS 8+
* Yarn 1.2+
* TypeScript 2.3+

## **Install Dependencies**

* To install backend dependencies go to the main directory where is located the `package.json`

```sh
yarn install
typings install
```

## **Deployment**

### **Hosts**

* For development, add to `/etc/hosts`

```sh
127.0.0.1   car-auction-api
127.0.0.1   car-auction-ui
```

### **Without Docker**

* To run, on the main directory where is located the `package.json`

```sh
ng serve -e (dev|prod)
```

### **With Docker**

#### **Build**

* In the root directory execute

```sh
docker build -t car-auction-ui --build-arg ENV=(dev|prod) -f docker/Dockerfile .
```

**Note.** You can specify environment with `ENV` argument. By default `ENV` is set with `prod`. Possibles values are: `prod` and `dev`.

#### **Run**

* After build the image, execute

```sh
docker run --rm --name car-auction-ui --add-host=car-auction-api:${IP} -p 0.0.0.0:4200:80 car-auction-ui
```

### **Testing**

* Go to [http://car-auction-ui:4200](http://car-auction-ui:4200)
