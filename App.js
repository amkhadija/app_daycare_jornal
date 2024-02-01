import React, { useState } from "react";
import * as MailComposer from "expo-mail-composer";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const HumorComponent = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.option}>
      <Text>{value}</Text>
    </View>
  </TouchableOpacity>
);

const AppetiteComponent = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.option}>
      <Text>{value}</Text>
    </View>
  </TouchableOpacity>
);

const SleepComponent = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.option}>
      <Text>{value}</Text>
    </View>
  </TouchableOpacity>
);

const CommentComponent = ({ value, onChangeText }) => (
  <View style={styles.commentContainer}>
    <Text>Commentaire:</Text>
    <TextInput
      style={styles.commentInput}
      multiline
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const YourPage = () => {
  const [humeur, setHumeur] = useState(""); // Déclarer l'état pour humeur
  const [nourriture, setNourriture] = useState(""); // Déclarer l'état pour nourriture
  const [sommeil, setSommeil] = useState(""); // Déclarer l'état pour sommeil
  const [commentaire, setCommentaire] = useState(""); // Déclarer l'état pour commentaire

  const handleHumorChange = (value) => {
    setHumeur(value); // Mettre à jour l'état humeur
  };

  const handleAppetiteChange = (value) => {
    setNourriture(value); // Mettre à jour l'état nourriture
  };

  const handleSleepChange = (value) => {
    setSommeil(value); // Mettre à jour l'état sommeil
  };

  const handleCommentChange = (text) => {
    setCommentaire(text); // Mettre à jour l'état commentaire
  };

  const handleSendEmail = async () => {
    const subject = "Détails de l'humeur, de l'appétit et du sommeil";
    const body = `Humeur: ${humeur}\nAppétit: ${nourriture}\nSommeil: ${sommeil}\nCommentaire: "${commentaire}"`;

    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (isAvailable) {
        await MailComposer.composeAsync({
          subject,
          body,
          recipients: ["khadija.khorchani@gmail.com"],
        });
      } else {
        Alert.alert(
          "Erreur",
          "La fonctionnalité d'envoi d'e-mail n'est pas disponible sur cet appareil."
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi d'e-mail:", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'envoi de l'e-mail."
      );
    }
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <Text>Humeur:</Text>
        <View style={styles.inlineOptions}>
          <HumorComponent
            value="Excellent"
            onPress={() => handleHumorChange("Excellent")}
          />
          <HumorComponent
            value="Bonne"
            onPress={() => handleHumorChange("Bonne")}
          />
          <HumorComponent
            value="Moyenne"
            onPress={() => handleHumorChange("Moyenne")}
          />
        </View>

        <Text>Appétit:</Text>
        <View style={styles.inlineOptions}>
          <AppetiteComponent
            value="Beaucoup"
            onPress={() => handleAppetiteChange("Beaucoup")}
          />
          <AppetiteComponent
            value="Moyenne"
            onPress={() => handleAppetiteChange("Moyenne")}
          />
          <AppetiteComponent
            value="Peu"
            onPress={() => handleAppetiteChange("Peu")}
          />
        </View>

        <Text>Sommeil:</Text>
        <View style={styles.inlineOptions}>
          <SleepComponent value="0" onPress={() => handleSleepChange("0")} />
          <SleepComponent
            value="+1h"
            onPress={() => handleSleepChange("+1h")}
          />
          <SleepComponent
            value="-1h"
            onPress={() => handleSleepChange("-1h")}
          />
        </View>

        <CommentComponent value="" onChangeText={handleCommentChange} />
      </View>
      <TouchableOpacity onPress={handleSendEmail}>
        <View style={styles.button}>
          <Text>Envoyer</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 5,
  },
  commentContainer: {
    marginTop: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: 300,
    height: 100,
  },
  inlineOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default YourPage;
