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
     2.1 Nom de la base de données: cnam      
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
       3. Nom de la classe de la source de données: oracle.jdbc.pool.OracleDataSource     
       4. Ajouter les propriétés suivantes:      
          DatabaseName: cnamdb           
          Username/Password: root           
          URL: jdbc:mysql://localhost:3306:cnamdb       
          PortNumber: 3306          
               
      5. Créer une source de données: Ressources ; clique sur Ressources JDBC ; clique sous Nouveau.  
            Nom JNDI : jdbc/CnamPool     
            Nom du pool : CnamPool 
         
    5. Enregistrez le dossier de l'application sous C:\ 
     
# P
