
---

````markdown
#  Microservices - Book & Loan Platform

Ce projet illustre une architecture de microservices déployée dans Kubernetes avec Istio et Docker.

---

## Architecture

Le système est composé de :

- `book-service` : service Node.js exposant une route `/books`.
- `loan-service` : service Node.js exposant une route `/loans`.
- `mysql` : base de données MySQL utilisée pour la persistance des livres (tentative d'intégration).
- Un `Ingress` via Minikube pour exposer les routes localement (`book.local`).
- Un `Service Mesh` avec **Istio** pour gérer les communications internes.

---

## Objectifs 

- Comprendre l'architecture microservices.
- Déployer des services dans Kubernetes (via Minikube).
- Conteneuriser les services avec Docker.
- Implémenter un Ingress Controller.
- Mettre en place un Service Mesh avec Istio.
- Intégrer une base de données (MySQL).

---

##  Technologies utilisées

- Node.js (Express)
- Docker & Docker Hub
- Kubernetes (via Minikube)
- Istio (Service Mesh)
- MySQL
- Ingress NGINX
- `curl`, `kubectl`

---

## Démarrage local

1. Lancer Minikube :

```bash
minikube start
minikube addons enable ingress
````

2. Créer les services :

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

3. Démarrer le tunnel (important pour accès via book.local) :

```bash
minikube tunnel
```

4. Ajouter dans `/etc/hosts` :

```
127.0.0.1 book.local
```

5. Accès aux routes :

* `http://book.local/books`
* `http://book.local/loans`

---

## Fonctionnalités

* [x] Service de gestion de livres
* [x] Service de gestion des emprunts
* [x] Dockerisation des services
* [x] Déploiement Kubernetes
* [x] Ingress Gateway
* [x] Istio Service Mesh
* \[\~] Intégration MySQL (fonctionnelle dans le pod, échec sur redéploiement global)

---

##  Structure du projet

```
microservices-project/
│
├── book-service/
│   ├── index.js
│   ├── Dockerfile
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── virtualservice.yaml
│   └── gateway.yaml
│
├── loan-service/
│   ├── index.js
│   ├── Dockerfile
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── virtualservice.yaml
│   └── gateway.yaml
│
└── mysql/
    ├── mysql-deployment.yaml
    ├── mysql-secret.yaml
    └── mysql-configmap.yaml
```

---

## Schéma d’architecture

### Avant Service Mesh

```
Navigateur
   │
Ingress (book.local)
   ├── /books  ──> book-service
   └── /loans  ──> loan-service
```

---

### Avec Istio (Service Mesh)

```
Navigateur
   │
Ingress Gateway (Istio)
   │
VirtualService
   ├── /books ──> book-service
   └── /loans ──> loan-service
                     │
                     └── Base de données MySQL (en cours d’intégration)
```




