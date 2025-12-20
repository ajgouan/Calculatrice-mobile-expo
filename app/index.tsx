import React, { useState } from "react";
import {
   SafeAreaView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

export default function Index() {
   const [currentNumber, setCurrentNumber] = useState("");
   const [lastNumber, setLastNumber] = useState("");
   const [operation, setOperation] = useState("");

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
         case "-":
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
      setCurrentNumber(result.toString());
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

   const buttons = [
      ["C", "", "", "÷"],
      ["7", "8", "9", "×"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "=", ""],
   ];

   return (
      <SafeAreaView style={styles.container}>
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
            {buttons.map((row, rowIndex) => (
               <View key={rowIndex} style={styles.row}>
                  {row.map((item, colIndex) => {
                     if (item === "") {
                        if (rowIndex === 4 && colIndex === 3) return null;
                     }
                     return null;
                  })}
               </View>
            ))}

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
                  onPress={() => handleOperation("-")}
               >
                  <Text style={styles.operationText}>-</Text>
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
      marginBottom: 20,
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
});
