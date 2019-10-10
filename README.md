# Un système bancaire
Je prévois de développer un système bancaire.
 
Le système comprendra les fonctionnalités suivantes: 

 1. Créer / Rechercher / modifier une carte de crédit ou de débit. 
 2. Rechercher / modifier une transaction effectuée par le client. 
 3. Générer des rapports sur les cartes / transactions. 

Le logiciel sera développé avec JAVA J2EE. Base de données:MySQL. 

# Prérequis 
  1. Installez Netbeans 8.0 [Netbeans Website](http://www.netbeans.org/)     
  
  2. Installez Mysql et créez une base de données avec les informations d'identification suivantes:    
     2.1 Nom de la base de données: cnamdb      
     2.2 Nom d'utilisateur / mot de passe: root     
     2.3 Hostname : localhost     
     2.4 Port: 3306      
     
  3. Exécutez 'create_db.sql' pour créer toutes les tables et tous les procédures. 
  
  4. Lancez Netbeans.    
     4.1 Démarrer le serveur Glassfish.
     4.2 Accéder à la console  http://localhost:4848 
     4.2 Créer un pool de connexion:  
       1. Ressources - JDBC - Pools de connexions JDBC    
       2. Pool Name: CnamPool   
       3. Nom de la classe de la source de données: com.mysql.jdbc.jdbc2.optional.MysqlDataSource     
       4. Ajouter les propriétés suivantes:      
          DatabaseName: cnamdb           
          Username/Password: root           
          URL: jdbc:mysql://localhost:3306/cnamdb       
          PortNumber: 3306          
               
      5. Créer une source de données: Ressources ; clique sur Ressources JDBC ; clique sous Nouveau.  
            Nom JNDI : jdbc/CnamPool     
            Nom du pool : CnamPool.    
            
  5. Enregistrez le dossier de l'application 'SaadaCnamP2' sous C:\.   
  
# Les étapes  
  1. Lancez le project 'CnamP2App' via Netbeans.   
  2. Faites un clic droit sur le nœud supérieur:CnamP2App.  
  3. Cliquez: Clean and Build  
  4. Attendez que les résultats soient terminés avec succès puis déployez l'application sur le glassfish.
  5. Après le déploiement, vous pouvez accéder à l'application via le Web en suivant le lien ci-dessous: 
        localhost:8080/CnamP2App/
        
# L'utilisation de l'application  

 **Login Page** <br/> 
   Comme il s’agit d’une application Web, la sécurité est la partie essentielle. Seules les personnes autorisées peuvent l'accéder.
 ![LoginPage](https://github.com/projetc22019/saada_projetc2/blob/master/login.png)  
 
 **Main Page** <br/> 
 Une fois les informations d’identification réussies, vous serez redirigé vers la page principale. 
 
  ![MainPage](https://github.com/projetc22019/saada_projetc2/blob/master/MainPage.png)  
  
 **Customer Page** <br/> 
  L'onglet Client est lié aux informations du titulaire de la carte. Toutes leurs données d'identification sont extraites de ce module.   
 
 ![CustomerMainPage](https://github.com/projetc22019/saada_projetc2/blob/master/CustomerMainPage.png)  
 
 **Customer Search Page** <br/> 
  
 ![CustomerSearchPage](https://github.com/projetc22019/saada_projetc2/blob/master/CustomerSearchPage.png)   

 **Add Customer Page** <br/> 
  
  ![AddCustomerPage](https://github.com/projetc22019/saada_projetc2/blob/master/CustomerAddPage.png)   

 **Delete Customer Page** <br/> 
  
  ![DeleteCustomerPage](https://github.com/projetc22019/saada_projetc2/blob/master/CustomerDeletePage1.png)   
  
  **Product Main Page** <br/> 
    Chaque carte doit être liée à un produit défini par VISA ou MASTERCARD.
    Les 6 premiers chiffres du numéro de carte représentent un produit.  
   
  ![ProductMainPage](https://github.com/projetc22019/saada_projetc2/blob/master/ProductMainPage.png)
  
  **Search for a Product ** <br/> 

  ![ProductSearchPage](https://github.com/projetc22019/saada_projetc2/blob/master/ProductSearch.png)
  
  **Add a Product Number ** <br/>

   ![AddProductPage](https://github.com/projetc22019/saada_projetc2/blob/master/ProductAdd.png)
   
  # CARD MODULE  
  
  Un numéro de carte de crédit ou de débit est le numéro unique imprimé sur une carte de crédit ou de débit. Les six premiers   chiffres sont appelés le numéro d'identification de l'émetteur. Ils identifient l’émetteur - VISA, Mastercard ou AMEX par exemple. Les chiffres restants d'un numéro de carte de crédit sont uniques à chaque carte.    
  
 # Transaction Module
 
  Une transaction est l'utilisation de cartes de crédit par les clients pour acheter des biens. Le prix d'achat est envoyé par l'intermédiaire d'un processeur pour autorisation; si le montant est approuvé, il est automatiquement soumis au vendeur. Le montant est indiqué sur le relevé de carte de crédit du client et doit être remboursé. Une transaction peut également faire référence à un crédit effectué sur le compte de carte de crédit du client, par exemple lorsqu'un bien est retourné pour un remboursement.    

