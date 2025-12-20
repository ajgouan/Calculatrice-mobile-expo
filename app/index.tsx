import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
   FlatList,
   Modal,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
   const [currentNumber, setCurrentNumber] = useState("");
   const [lastNumber, setLastNumber] = useState("");
   const [operation, setOperation] = useState("");
   const [history, setHistory] = useState<
      { expression: string; result: string }[]
   >([]);
   const [showHistory, setShowHistory] = useState(false);

   const handleNumberInput = (number: string) => {
      if (number === ".") {
         if (currentNumber.includes(".")) return;
         setCurrentNumber(currentNumber ? currentNumber + "." : "0.");
      } else {
         setCurrentNumber(
            currentNumber === "0" ? number : currentNumber + number
         );
      }
   };

   const handleOperation = (op: string) => {
      setOperation(op);
      if (currentNumber === "") {
         if (lastNumber === "") {
            setLastNumber("0");
         }
      } else {
         setLastNumber(currentNumber);
         setCurrentNumber("");
      }
   };

   const clear = () => {
      setCurrentNumber("");
      setLastNumber("");
      setOperation("");
   };

   const calculate = () => {
      const current = parseFloat(currentNumber);
      const last = parseFloat(lastNumber);
      if (!operation || isNaN(current) || isNaN(last)) return;

      let result = 0;
      switch (operation) {
         case "+":
            result = last + current;
            break;
         case "−":
            result = last - current;
            break;
         case "×":
            result = last * current;
            break;
         case "÷":
            if (current === 0) {
               setCurrentNumber("Erreur");
               setLastNumber("");
               setOperation("");
               return;
            }
            result = last / current;
            break;
      }
      const resultValue = result.toString();
      const entry = {
         expression: `${last} ${operation} ${current}`,
         result: resultValue,
      };
      setHistory([entry, ...history]);
      setCurrentNumber(resultValue);
      setLastNumber("");
      setOperation("");
   };

   const toggleSign = () => {
      if (currentNumber) {
         setCurrentNumber((parseFloat(currentNumber) * -1).toString());
      }
   };

   const percentage = () => {
      if (currentNumber) {
         setCurrentNumber((parseFloat(currentNumber) / 100).toString());
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity
               onPress={() => setShowHistory(true)}
               style={styles.menuButton}
            >
               <Ionicons name="menu" size={32} color="#ff9f0a" />
            </TouchableOpacity>
         </View>

         <Modal
            visible={showHistory}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowHistory(false)}
         >
            <View style={styles.modalOverlay}>
               <View style={styles.historyContainer}>
                  <View style={styles.historyHeader}>
                     <Text style={styles.historyTitle}>Historique</Text>
                     <TouchableOpacity onPress={() => setShowHistory(false)}>
                        <Ionicons name="close" size={30} color="#fff" />
                     </TouchableOpacity>
                  </View>

                  <FlatList
                     data={history}
                     keyExtractor={(_, index) => index.toString()}
                     renderItem={({ item }) => (
                        <View style={styles.historyItem}>
                           <Text style={styles.historyExpression}>
                              {item.expression}
                           </Text>
                           <Text style={styles.historyResult}>
                              {item.result}
                           </Text>
                        </View>
                     )}
                     ListEmptyComponent={
                        <Text style={styles.emptyText}>Aucun historique</Text>
                     }
                  />

                  {history.length > 0 && (
                     <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => setHistory([])}
                     >
                        <Text style={styles.clearButtonText}>
                           Effacer l&apos;historique
                        </Text>
                     </TouchableOpacity>
                  )}
               </View>
            </View>
         </Modal>

         <View style={styles.resultContainer}>
            <Text
               style={styles.historyText}
               numberOfLines={1}
               adjustsFontSizeToFit
            >
               {lastNumber} {operation}
            </Text>
            <Text
               style={styles.resultText}
               numberOfLines={1}
               adjustsFontSizeToFit
            >
               {currentNumber || "0"}
            </Text>
         </View>
         <View style={styles.buttonsContainer}>
            <View style={styles.row}>
               <TouchableOpacity
                  style={[styles.button, styles.actionBtn]}
                  onPress={clear}
               >
                  <Text style={styles.actionText}>C</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.button, styles.actionBtn]}
                  onPress={toggleSign}
               >
                  <Text style={styles.actionText}>+/-</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.button, styles.actionBtn]}
                  onPress={percentage}
               >
                  <Text style={styles.actionText}>%</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.button, styles.operationBtn]}
                  onPress={() => handleOperation("÷")}
               >
                  <Text style={styles.operationText}>÷</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.row}>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("7")}
               >
                  <Text style={styles.text}>7</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("8")}
               >
                  <Text style={styles.text}>8</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("9")}
               >
                  <Text style={styles.text}>9</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.button, styles.operationBtn]}
                  onPress={() => handleOperation("×")}
               >
                  <Text style={styles.operationText}>×</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.row}>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("4")}
               >
                  <Text style={styles.text}>4</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("5")}
               >
                  <Text style={styles.text}>5</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("6")}
               >
                  <Text style={styles.text}>6</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.button, styles.operationBtn]}
                  onPress={() => handleOperation("−")}
               >
                  <Text style={styles.operationText}>−</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.row}>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("1")}
               >
                  <Text style={styles.text}>1</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("2")}
               >
                  <Text style={styles.text}>2</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput("3")}
               >
                  <Text style={styles.text}>3</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.button, styles.operationBtn]}
                  onPress={() => handleOperation("+")}
               >
                  <Text style={styles.operationText}>+</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.row}>
               <TouchableOpacity
                  style={styles.zeroBtn}
                  onPress={() => handleNumberInput("0")}
               >
                  <Text style={[styles.text, { paddingLeft: 20 }]}>0</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNumberInput(".")}
               >
                  <Text style={styles.text}>.</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.button, styles.operationBtn]}
                  onPress={calculate}
               >
                  <Text style={styles.operationText}>=</Text>
               </TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#000",
   },
   resultContainer: {
      flex: 1,
      paddingRight: 20,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      marginBottom: 10,
   },
   historyText: {
      color: "#7c7c7c",
      fontSize: 30,
      marginBottom: 10,
   },
   resultText: {
      color: "#fff",
      fontSize: 70,
      fontWeight: "300",
   },
   buttonsContainer: {
      paddingBottom: 20,
      backgroundColor: "#000",
   },
   row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      paddingHorizontal: 10,
   },
   button: {
      backgroundColor: "#333333",
      flex: 1,
      aspectRatio: 1, // Rendre les buttons circulaire/carré
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      margin: 5,
   },
   zeroBtn: {
      backgroundColor: "#333333",
      flex: 2,
      alignItems: "flex-start",
      justifyContent: "center",
      borderRadius: 100,
      paddingLeft: 10,
      margin: 5,
   },
   actionBtn: {
      backgroundColor: "#a5a5a5",
   },
   operationBtn: {
      backgroundColor: "#ff9f0a",
   },
   text: {
      fontSize: 36,
      color: "#fff",
   },
   actionText: {
      fontSize: 30,
      color: "#000",
   },
   operationText: {
      fontSize: 36,
      color: "#fff",
   },
   header: {
      paddingHorizontal: 20,
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
   },
   menuButton: {
      padding: 5,
   },
   modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.8)",
      justifyContent: "flex-end",
   },
   historyContainer: {
      backgroundColor: "#1c1c1c",
      height: "70%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
   },
   historyHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
   },
   historyTitle: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "bold",
   },
   historyItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#333",
      alignItems: "flex-start",
   },
   historyExpression: {
      color: "#5c5c5c",
      fontSize: 16,
      marginBottom: 4,
      fontWeight: "bold",
   },
   historyResult: {
      color: "#dbdbdbff",
      fontSize: 18,
      fontWeight: "semibold",
   },
   emptyText: {
      color: "#7c7c7c",
      fontSize: 18,
      textAlign: "center",
      marginTop: 50,
   },
   clearButton: {
      margin: 20,
      backgroundColor: "#333",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
   },
   clearButtonText: {
      color: "#ff3b30",
      fontSize: 18,
      fontWeight: "600",
   },
});
