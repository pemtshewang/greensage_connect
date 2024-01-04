import { View, Text, Input, Button } from "native-base";
import { IWebSocket } from "../../zustand/state";
import Icons from "../../assets/Icons/Icons";
import { useState } from "react";

const ThresholdSetForm = ({
  type,
  title,
  message,
  ws,
  defaultValue
}: {
  type: "ventilation" | "soil_moisture",
  title: string,
  message: string,
  ws: IWebSocket,
  defaultValue: string
}) => {
  const [changeState, setChangeState] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const toggleChangeState = () => setChangeState(!changeState);

  const sendThreshold = () => {
    setValue(defaultValue);
    ws.sendMessage(`temperature:threshold:${value}`);
    toggleChangeState();
  }

  return (
    <View style={{
      flexDirection: "column",
      borderWidth: 2,
      width: "100%",
      padding: 20,
      marginTop: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      borderRadius: 9,
      borderColor: "lightgray"
    }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between"
      }}>
        <Text>{message}</Text>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
          {type === "ventilation" ? <Icons.thermometer width={25} height={25} color="black" /> : <Icons.soilMoisture width={25} height={25} color="black" />}
          <Icons.ArrowBigRight size={25} color="black" />
          {type === "ventilation" ? <Icons.exhaustFan width={25} height={25} color="black" /> : <Icons.waterTap width={25} height={25} color="black" />}
        </View>
      </View>
      <View style={{
        flexDirection: "column",
        gap: 5,
        alignItems: "center"
      }}>
        <View alignItems="center" flexDirection="row">
          <Input
            placeholder={`${parseInt(defaultValue) < 1 ? "You haven't set a threshold yet" : defaultValue}`}
            placeholderTextColor="#A0A0A0"
            style={{
              textAlign: "center",
              fontSize: 20
            }}
            inputMode="numeric"
            onChangeText={(text: string) => setValue(text)}
            value={value.toString()}
            isDisabled={!changeState}
            w="12"
            borderWidth={changeState ? 2 : 0}
            autoFocus={changeState}
          />
          <Text
            style={{
              color: "#A0A0A0",
              fontSize: 20
            }}
          >
            {
              type === "ventilation" ? "°C" : "%"
            }
          </Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10
          }}
        >
          <Button
            onPress={changeState ? sendThreshold : toggleChangeState}
            style={{
              backgroundColor: changeState ? "green" : "#0f9",
              paddingTop: 5,
            }}
          >
            <Text color="#002">
              {
                changeState ? "Confirm" : "Change"
              }
            </Text>
          </Button>
          {
            changeState && (
              <Button onPress={
                () => {
                  setValue(defaultValue);
                  toggleChangeState();
                }
              }>
                Cancel
              </Button>
            )
          }
        </View>
      </View>
      {
        changeState && (
          <View flexDirection="row" style={{
            gap: 2
          }}>
            <Icons.help size={16} color="#A0A0A0" />
            <Text color="#A0A0A0">
              Enter the temperature threshold and press confirm
            </Text>
          </View>
        )
      }
    </View >
  )
}

export default ThresholdSetForm;
