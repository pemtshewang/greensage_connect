import { View, Text, Input, Button } from "native-base";
import { IWebSocket } from "../../zustand/state";
import Icons from "../../assets/Icons/Icons";
import { useState } from "react";
import { useToast } from "native-base";

const ThresholdSetForm = ({
  type,
  message,
  ws,
  defaultValue
}: {
  type: "ventilation" | "soil_moisture",
  message: string,
  ws: IWebSocket,
  defaultValue: string
}) => {
  const [changeState, setChangeState] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const toggleChangeState = () => setChangeState(!changeState);
  const toast = useToast();

  const sendThreshold = () => {
    setValue(value);
    ws.sendMessage(`threshold:temperature:${value}`);
    console.log("Sending threshold");
    toggleChangeState();
    toast.show({
      render: () => {
        return (
          <View style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 20
          }}>
            <Text color="white">
              The {type === "ventilation" ? "temperature" : "soil moisture"} threshold has been reset to {value} {type === "soil_moisture" ? "%" : "°C"}
            </Text>
          </View>
        )
      },
      placement: "bottom",
      duration: 2000,
    });
  }
  return (
    <View
      margin="2"
      padding="5"
      style={{
        flexDirection: "column",
        borderWidth: 2,
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
        <View position="relative" flexDirection="row" w="full" justifyContent="center" >
          <Input
            placeholder={`${parseInt(defaultValue) < 1 ? "You haven't set a threshold yet" : defaultValue}`}
            placeholderTextColor="#A0A0A0"
            alignItems="center"
            style={{
              textAlign: "center",
              fontSize: 20,
              borderBottomWidth: 2,
              borderBottomColor: "black"
            }}
            inputMode="numeric"
            onChangeText={(text: string) => setValue(text)}
            value={value.toString()}
            isDisabled={!changeState}
            w={60}
            borderWidth={0}
            autoFocus={changeState}
          />
          < Text style={{
            position: "absolute",
            top: "34%",
            right: "35%",
            textAlignVertical: "center",
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
