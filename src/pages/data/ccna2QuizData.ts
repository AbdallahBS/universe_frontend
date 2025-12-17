// CCNA 2 v7.0 - Switching, Routing, and Wireless Essentials
// Extracted from the Final Exam
// Source: itexamanswers.net

export interface CCNA2Question {
    id: number;
    question: string;
    options: string[];
    correctAnswers: number[];
    type: 'single' | 'multiple' | 'matching';
    explanation: string;
    imageUrl?: string;
    leftItems?: string[];
    rightItems?: string[];
    correctMatches?: { [leftIndex: number]: number };
}

export const ccna2Questions: CCNA2Question[] = [
    {
        id: 1,
        question: "Refer to the exhibit. What will router R1 do with a packet that has a destination IPv6 address of 2001:db8:cafe:5::1?",
        options: ["forward the packet out GigabitEthernet0/0", "drop the packet", "forward the packet out GigabitEthernet0/1", "forward the packet out Serial0/0/0"],
        correctAnswers: [3],
        type: 'single',
        explanation: "The route ::/0 is the compressed form of the default route. The default route is used if a more specific route is not found in the routing table.",
        imageUrl: "/CCNA2/Switching-Routing-and-Wireless-Essentials-Version-7.00-Final-Answers-1.png"
    },
    {
        id: 2,
        question: "Refer to the exhibit. Currently router R1 uses an EIGRP route learned from Branch2 to reach the 10.10.0.0/16 network. Which floating static route would create a backup route to the 10.10.0.0/16 network in the event that the link between R1 and Branch2 goes down?",
        options: ["ip route 10.10.0.0 255.255.0.0 Serial 0/0/0 100", "ip route 10.10.0.0 255.255.0.0 209.165.200.226 100", "ip route 10.10.0.0 255.255.0.0 209.165.200.225 100", "ip route 10.10.0.0 255.255.0.0 209.165.200.225 50"],
        correctAnswers: [2],
        type: 'single',
        explanation: "A floating static route needs to have an administrative distance greater than the active route. EIGRP has an AD of 90, so the floating static route must have AD greater than 90.",
        imageUrl: "/CCNA2/Switching-Routing-and-Wireless-Essentials-Version-7.00-Final-Answers-2.png"
    },
    {
        id: 3,
        question: "Refer to the exhibit. R1 was configured with the static route command ip route 209.165.200.224 255.255.255.224 S0/0/0 and consequently users on network 172.16.0.0/16 are unable to reach resources on the Internet. How should this static route be changed to allow user traffic from the LAN to reach the Internet?",
        options: ["Add an administrative distance of 254.", "Change the destination network and mask to 0.0.0.0 0.0.0.0", "Change the exit interface to S0/0/1.", "Add the next-hop neighbor address of 209.165.200.226."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The static route on R1 has been incorrectly configured with the wrong destination network and mask. The correct destination network and mask is 0.0.0.0 0.0.0.0.",
        imageUrl: "/CCNA2/sfdsgfdg5-1.jpg"
    },
    {
        id: 4,
        question: "Which option shows a correctly configured IPv4 default static route?",
        options: ["ip route 0.0.0.0 255.255.255.0 S0/0/0", "ip route 0.0.0.0 0.0.0.0 S0/0/0", "ip route 0.0.0.0 255.255.255.255 S0/0/0", "ip route 0.0.0.0 255.0.0.0 S0/0/0"],
        correctAnswers: [1],
        type: 'single',
        explanation: "The static route ip route 0.0.0.0 0.0.0.0 S0/0/0 is considered a default static route and will match all destination networks."
    },
    {
        id: 5,
        question: "Refer to the exhibit. Which static route command can be entered on R1 to forward traffic to the LAN connected to R2?",
        options: ["ipv6 route 2001:db8:12:10::/64 S0/0/0", "ipv6 route 2001:db8:12:10::/64 S0/0/1 fe80::2", "ipv6 route 2001:db8:12:10::/64 S0/0/0 fe80::2", "ipv6 route 2001:db8:12:10::/64 S0/0/1 2001:db8:12:10::1"],
        correctAnswers: [1],
        type: 'single',
        explanation: "When using a link-local address as the next-hop, you must specify both the exit interface and the link-local address.",
        imageUrl: "/CCNA2/2020-01-31_201339-768x336-1.png"
    },
    {
        id: 6,
        question: "What is a method to launch a VLAN hopping attack?",
        options: ["introducing a rogue switch and enabling trunking", "sending spoofed native VLAN information", "sending spoofed IP addresses from the attacking host", "flooding the switch with MAC addresses"],
        correctAnswers: [0],
        type: 'single',
        explanation: "VLAN hopping can be launched by introducing a rogue switch and enabling trunking to gain access to all VLANs."
    },
    {
        id: 7,
        question: "A cybersecurity analyst is using the macof tool to evaluate configurations of switches deployed in the backbone network of an organization. Which type of LAN attack is the analyst targeting during this evaluation?",
        options: ["VLAN hopping", "DHCP spoofing", "MAC address table overflow", "VLAN double-tagging"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Macof is a network attack tool and is mainly used to flood LAN switches with MAC addresses."
    },
    {
        id: 8,
        question: "Refer to the exhibit. A network administrator is configuring a router as a DHCPv6 server. The administrator issues a show ipv6 dhcp pool command to verify the configuration. Which statement explains the reason that the number of active clients is 0?",
        options: ["The default gateway address is not provided in the pool.", "No clients have communicated with the DHCPv6 server yet.", "The IPv6 DHCP pool configuration has no IPv6 address range specified.", "The state is not maintained by the DHCPv6 server under stateless DHCPv6 operation."],
        correctAnswers: [3],
        type: 'single',
        explanation: "Under stateless DHCPv6 configuration, the DHCPv6 server does not maintain state information because client IPv6 addresses are not managed by the DHCP server.",
        imageUrl: "/CCNA2/i210895v1n1_210895.jpg"
    },
    {
        id: 9,
        question: "Refer to the exhibit. A network administrator configured routers R1 and R2 as part of HSRP group 1. After the routers have been reloaded, a user on Host1 complained of lack of connectivity to the Internet. Which entry should be seen in the ARP table on Host1 in order to gain connectivity to the Internet?",
        options: ["the virtual IP address and the virtual MAC address for the HSRP group 1", "the virtual IP address of the HSRP group 1 and the MAC address of R1", "the virtual IP address of the HSRP group 1 and the MAC address of R2", "the IP address and the MAC address of R1"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Hosts will send an ARP request to the default gateway which is the virtual IP address. ARP replies from the HSRP routers contain the virtual MAC address.",
        imageUrl: "/CCNA2/2020-01-31_201813-768x556-1.png"
    },
    {
        id: 10,
        question: "Match the forwarding characteristic to its type. (Not all options are used.)",
        type: 'matching',
        leftItems: ["frames from one port are sent to all other ports", "uses MAC address to port mappings", "always forwards broadcasts and multicasts"],
        rightItems: ["store-and-forward", "cut-through", "selective forwarding", "flooding"],
        correctMatches: { 0: 3, 1: 0, 2: 3 },
        options: [],
        correctAnswers: [],
        explanation: "Store-and-forward uses MAC address mapping. Flooding forwards frames to all ports except incoming. Cut-through forwards after reading destination address.",
        imageUrl: "/CCNA2/CCNA-2-v7-final-exam-answers-10.png"
    },
    {
        id: 11,
        question: "Which statement is correct about how a Layer 2 switch determines how to forward frames?",
        options: ["Frame forwarding decisions are based on MAC address and port mappings in the CAM table.", "Only frames with a broadcast destination address are forwarded out all active switch ports.", "Unicast frames are always forwarded regardless of the destination MAC address.", "Cut-through frame forwarding ensures that invalid frames are always dropped."],
        correctAnswers: [0],
        type: 'single',
        explanation: "Layer 2 switches use the CAM (Content Addressable Memory) table to make forwarding decisions based on MAC address and port mappings."
    },
    {
        id: 12,
        question: "Which statement describes a result after multiple Cisco LAN switches are interconnected?",
        options: ["The broadcast domain expands to all switches.", "One collision domain exists per switch.", "There is one broadcast domain and one collision domain per switch.", "Frame collisions increase on the segments connecting the switches."],
        correctAnswers: [0],
        type: 'single',
        explanation: "LAN switches do not filter broadcast frames. Interconnected switches form one big broadcast domain."
    },
    {
        id: 13,
        question: "Match the link state to the interface and protocol status. (Not all options are used.)",
        type: 'matching',
        leftItems: ["Layer 1 problem", "Layer 2 problem", "Disabled", "Operational"],
        rightItems: ["down/down", "up/down", "administratively down", "up/up"],
        correctMatches: { 0: 0, 1: 1, 2: 2, 3: 3 },
        options: [],
        correctAnswers: [],
        explanation: "down/down = Layer 1 problem, up/down = Layer 2 problem, administratively down = Disabled, up/up = Operational.",
        imageUrl: "/CCNA2/CCNA-2-v7-final-exam-answers-13.png"
    },
    {
        id: 14,
        question: "Refer to the exhibit. How is a frame sent from PCA forwarded to PCC if the MAC address table on switch SW1 is empty?",
        options: ["SW1 forwards the frame directly to SW2.", "SW1 floods the frame on all ports except the interconnected port to SW2.", "SW1 floods the frame on all ports on SW1, excluding the port through which the frame entered the switch.", "SW1 drops the frame because it does not know the destination MAC address."],
        correctAnswers: [2],
        type: 'single',
        explanation: "When a switch has no entries in the MAC address table, it will forward the frame out all ports except the port that brought the frame into the switch.",
        imageUrl: "/CCNA2/2020-01-31_202702.png"
    },
    {
        id: 15,
        question: "An administrator is trying to remove configurations from a switch. After using the command erase startup-config and reloading the switch, the administrator finds that VLANs 10 and 100 still exist on the switch. Why were these VLANs not removed?",
        options: ["Because these VLANs are stored in a file that is called vlan.dat that is located in flash memory, this file must be manually deleted.", "These VLANs cannot be deleted unless the switch is in VTP client mode.", "These VLANs are default VLANs that cannot be removed.", "These VLANs can only be removed from the switch by using the no vlan 10 and no vlan 100 commands."],
        correctAnswers: [0],
        type: 'single',
        explanation: "Standard range VLANs (1-1005) are stored in vlan.dat file in flash memory. This file must be manually deleted."
    },
    {
        id: 16,
        question: "Match the description to the correct VLAN type. (Not all options are used.)",
        type: 'matching',
        leftItems: ["Native VLAN", "Management VLAN", "Default VLAN", "Data VLANs"],
        rightItems: ["Carries untagged traffic", "An IP address and subnet mask are assigned to this VLAN", "All switch ports are assigned to this VLAN after initial bootup", "Configured to carry user generated traffic"],
        correctMatches: { 0: 0, 1: 1, 2: 2, 3: 3 },
        options: [],
        correctAnswers: [],
        explanation: "Native VLAN carries untagged traffic. Management VLAN has an IP for switch access. Default VLAN is where all ports start. Data VLANs carry user traffic.",
        imageUrl: "/CCNA2/CCNA-2-v7-final-exam-answers-16.png"
    },
    {
        id: 17,
        question: "Refer to the exhibit. A network administrator has connected two switches together using EtherChannel technology. If STP is running, what will be the end result?",
        options: ["STP will block one of the redundant links.", "The switches will load balance and utilize both EtherChannels to forward packets.", "The resulting loop will create a broadcast storm.", "Both port channels will shutdown."],
        correctAnswers: [0],
        type: 'single',
        explanation: "By default, STP is enabled on switch devices. STP will block redundant links to prevent loops.",
        imageUrl: "/CCNA2/Switching-Routing-and-Wireless-Essentials-Version-7.00-Final-Answers-9.png"
    },
    {
        id: 18,
        question: "What is a secure configuration option for remote access to a network device?",
        options: ["Configure an ACL and apply it to the VTY lines.", "Configure 802.1x.", "Configure SSH.", "Configure Telnet."],
        correctAnswers: [2],
        type: 'single',
        explanation: "SSH provides encrypted remote access to network devices, making it the most secure option."
    },
    {
        id: 19,
        question: "Which wireless encryption method is the most secure?",
        options: ["WPA2 with AES", "WPA2 with TKIP", "WEP", "WPA"],
        correctAnswers: [0],
        type: 'single',
        explanation: "WPA2 with AES provides the strongest wireless encryption currently available."
    },
    {
        id: 20,
        question: "After attaching four PCs to the switch ports, configuring the SSID and setting authentication properties for a small office network, a technician successfully tests the connectivity of all PCs. A firewall is then configured on the device. What type of network device includes all of the described features?",
        options: ["firewall appliance", "wireless router", "switch", "standalone wireless access point"],
        correctAnswers: [1],
        type: 'single',
        explanation: "A wireless router combines switch ports, wireless AP functionality, and firewall capabilities in one device."
    },
    {
        id: 21,
        question: "Refer to the exhibit. Host A has sent a packet to host B. What will be the source MAC and IP addresses on the packet when it arrives at host B?",
        options: ["Source MAC: 00E0.FE91.7799, Source IP: 10.1.1.10", "Source MAC: 00E0.FE10.17A3, Source IP: 10.1.1.10", "Source MAC: 00E0.FE10.17A3, Source IP: 192.168.1.1", "Source MAC: 00E0.FE91.7799, Source IP: 10.1.1.1"],
        correctAnswers: [0],
        type: 'single',
        explanation: "As a packet traverses the network, Layer 2 addresses change at every hop but Layer 3 addresses remain the same.",
        imageUrl: "/CCNA2/p39-prac-final-ccna2.jpg"
    },
    {
        id: 23,
        question: "Refer to the exhibit. In addition to static routes directing traffic to networks 10.10.0.0/16 and 10.20.0.0/16, Router HQ is also configured with 'ip route 0.0.0.0 0.0.0.0 serial 0/1/1'. What is the purpose of this command?",
        options: ["Packets from the Internet will be forwarded to LANs connected to R1 or R2.", "Packets with a destination not 10.10.0.0/16 or 10.20.0.0/16 or directly connected will be forwarded to the Internet.", "Packets from 10.10.0.0/16 will be forwarded to 10.20.0.0/16 and vice versa.", "Packets destined for networks not in the routing table will be dropped."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The 0.0.0.0 0.0.0.0 route is a default route that forwards packets to destinations not specifically listed in the routing table.",
        imageUrl: "/CCNA2/2020-01-31_203919-768x465-1.png"
    },
    {
        id: 24,
        question: "What protocol or technology disables redundant paths to eliminate Layer 2 loops?",
        options: ["VTP", "STP", "EtherChannel", "DTP"],
        correctAnswers: [1],
        type: 'single',
        explanation: "STP (Spanning Tree Protocol) disables redundant paths to eliminate Layer 2 loops."
    },
    {
        id: 25,
        question: "Refer to the exhibit. Based on the exhibited configuration and output, why is VLAN 99 missing?",
        options: ["because VLAN 99 is not a valid management VLAN", "because there is a cabling problem on VLAN 99", "because VLAN 1 is up and there can only be one management VLAN", "because VLAN 99 has not yet been created"],
        correctAnswers: [3],
        type: 'single',
        explanation: "VLAN 99 is missing because it has not been created on the switch yet.",
        imageUrl: "/CCNA2/rx4-768x474-1.png"
    },
    {
        id: 26,
        question: "Which two VTP modes allow for the creation, modification, and deletion of VLANs on the local switch? (Choose two.)",
        options: ["client", "master", "distribution", "slave", "server", "transparent"],
        correctAnswers: [4, 5],
        type: 'multiple',
        explanation: "VTP server and transparent modes allow for VLAN creation, modification, and deletion on the local switch."
    },
    {
        id: 27,
        question: "Which three steps should be taken before moving a Cisco switch to a new VTP management domain? (Choose three.)",
        options: ["Configure the switch with the name of the new management domain.", "Reset the VTP counters.", "Configure the VTP server to recognize the BID.", "Download the VTP database from the server.", "Select the correct VTP mode and version.", "Reboot the switch."],
        correctAnswers: [0, 4, 5],
        type: 'multiple',
        explanation: "When adding a switch to a VTP domain, configure domain name, VTP mode/version, and reboot the switch."
    },
    {
        id: 28,
        question: "A network administrator is preparing the implementation of Rapid PVST+ on a production network. How are the Rapid PVST+ link types determined on the switch interfaces?",
        options: ["Link types can only be configured on access ports.", "Link types can only be determined if PortFast has been configured.", "Link types are determined automatically.", "Link types must be configured with specific port configuration commands."],
        correctAnswers: [2],
        type: 'single',
        explanation: "When Rapid PVST+ is implemented, link types are automatically determined but can be specified manually."
    },
    {
        id: 29,
        question: "Refer to the exhibit. All the displayed switches are Cisco 2960 switches with the same default priority and operating at the same bandwidth. Which three ports will be STP designated ports? (Choose three.)",
        options: ["fa0/9", "fa0/13", "fa0/10", "fa0/20", "fa0/21", "fa0/11"],
        correctAnswers: [1, 2, 4],
        type: 'multiple',
        explanation: "The switch with the lowest MAC address becomes root bridge. All its ports are designated. fa0/10, fa0/13, and fa0/21 are designated.",
        imageUrl: "/CCNA2/rx5.png"
    },
    {
        id: 30,
        question: "How will a router handle static routing differently if Cisco Express Forwarding is disabled?",
        options: ["It will not perform recursive lookups.", "Ethernet multiaccess interfaces will require fully specified static routes to avoid routing inconsistencies.", "Static routes that use an exit interface will be unnecessary.", "Serial point-to-point interfaces will require fully specified static routes."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Without CEF, multiaccess network interfaces require fully specified static routes to avoid routing table inconsistencies."
    },
    {
        id: 31,
        question: "Compared with dynamic routes, what are two advantages of using static routes on a router? (Choose two.)",
        options: ["They improve network security.", "They take less time to converge when the network topology changes.", "They improve the efficiency of discovering neighboring networks.", "They use fewer router resources."],
        correctAnswers: [0, 3],
        type: 'multiple',
        explanation: "Static routes improve security and use fewer resources as they don't require routing protocol overhead."
    },
    {
        id: 32,
        question: "Refer to the exhibit. Which route was configured as a static route to a specific network using the next-hop address?",
        options: ["S 10.17.2.0/24 [1/0] via 10.16.2.2", "S 0.0.0.0/0 [1/0] via 10.16.2.2", "S 10.17.2.0/24 is directly connected, Serial 0/0/0", "C 10.16.2.0/24 is directly connected, Serial0/0/0"],
        correctAnswers: [0],
        type: 'single',
        explanation: "The S denoting static route with [1/0] via next-hop address indicates a static route configured using the next-hop address.",
        imageUrl: "/CCNA2/rx6.png"
    },
    {
        id: 33,
        question: "What is the effect of entering the spanning-tree portfast configuration command on a switch?",
        options: ["It disables an unused port.", "It disables all trunk ports.", "It enables portfast on a specific switch interface.", "It checks the source L2 address in the Ethernet header against the sender L2 address in the ARP body."],
        correctAnswers: [2],
        type: 'single',
        explanation: "The spanning-tree portfast command enables PortFast on a specific switch interface."
    },
    {
        id: 34,
        question: "What is the IPv6 prefix that is used for link-local addresses?",
        options: ["FF01::/8", "2001::/3", "FC00::/7", "FE80::/10"],
        correctAnswers: [3],
        type: 'single',
        explanation: "The IPv6 link-local prefix is FE80::/10."
    },
    {
        id: 35,
        question: "Which two statements are characteristics of routed ports on a multilayer switch? (Choose two.)",
        options: ["In a switched network, they are mostly configured between switches at the core and distribution layers.", "The interface vlan command has to be entered to create a VLAN on routed ports.", "They support subinterfaces, like interfaces on the Cisco IOS routers.", "They are used for point-to-multipoint links.", "They are not associated with a particular VLAN."],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "Routed ports are configured between core/distribution switches and are not associated with any VLAN."
    },
    {
        id: 36,
        question: "Successful inter-VLAN routing has been operating on a network. When an inter-switch trunk link fails and STP brings up a backup trunk link, hosts on two VLANs can access some, but not all resources. What is the most likely cause?",
        options: ["The protected edge port function on the backup trunk has been disabled.", "The allowed VLANs on the backup link were not configured correctly.", "Dynamic Trunking Protocol on the link has failed.", "Inter-VLAN routing also failed when the trunk link failed."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The allowed VLANs on the backup link were not configured correctly, preventing some VLANs from traversing the link."
    },
    {
        id: 37,
        question: "Which command will start the process to bundle two physical interfaces to create an EtherChannel group via LACP?",
        options: ["interface port-channel 2", "channel-group 1 mode desirable", "interface range GigabitEthernet 0/4 – 5", "channel-group 2 mode auto"],
        correctAnswers: [2],
        type: 'single',
        explanation: "The interface range command is the first step to select the physical interfaces that will be bundled."
    },
    {
        id: 38,
        question: "What action takes place when a frame entering a switch has a multicast destination MAC address?",
        options: ["The switch will forward the frame out all ports except the incoming port.", "The switch forwards the frame out of the specified port.", "The switch adds a MAC address table entry mapping for the destination MAC address.", "The switch replaces the old entry and uses the more current port."],
        correctAnswers: [0],
        type: 'single',
        explanation: "If the destination MAC address is a broadcast or a multicast, the frame is flooded out all ports except the incoming port."
    },
    {
        id: 39,
        question: "A junior technician was adding a route to a LAN router. A traceroute to a device on the new network revealed a wrong path and unreachable status. What should be done or checked?",
        options: ["Verify that there is not a default route in any of the edge router routing tables.", "Check the configuration on the floating static route and adjust the AD.", "Create a floating static route to that network.", "Check the configuration of the exit interface on the new static route."],
        correctAnswers: [3],
        type: 'single',
        explanation: "Check the exit interface configuration on the new static route to verify it points to the correct interface."
    },
    {
        id: 40,
        question: "Select the three PAgP channel establishment modes. (Choose three.)",
        options: ["auto", "default", "passive", "desirable", "extended", "on"],
        correctAnswers: [0, 3, 5],
        type: 'multiple',
        explanation: "PAgP uses auto, desirable, and on modes for EtherChannel establishment."
    },
    {
        id: 41,
        question: "A static route has been configured on a router. However, the destination network no longer exists. What should an administrator do to remove the static route from the routing table?",
        options: ["Remove the route using the no ip route command.", "Change the administrative distance for that route.", "Change the routing metric for that route.", "Nothing. The static route will go away on its own."],
        correctAnswers: [0],
        type: 'single',
        explanation: "Static routes must be manually removed using the no ip route command."
    },
    {
        id: 42,
        question: "Refer to the exhibit. What can be concluded about the configuration shown on R1?",
        options: ["R1 is configured as a DHCPv4 relay agent.", "R1 is operating as a DHCPv4 server.", "R1 will broadcast DHCPv4 requests on behalf of local DHCPv4 clients.", "R1 will send a message to a local DHCPv4 client to contact a DHCPv4 server at 10.10.10.8."],
        correctAnswers: [0],
        type: 'single',
        explanation: "The ip helper-address command configures R1 as a DHCPv4 relay agent.",
        imageUrl: "/CCNA2/rx7.png"
    },
    {
        id: 44,
        question: "Refer to the exhibit. R1 has been configured as shown. However, PC1 is not able to receive an IPv4 address. What is the problem?",
        options: ["The ip helper-address command was applied on the wrong interface.", "R1 is not configured as a DHCPv4 server.", "A DHCP server must be installed on the same LAN as the host.", "The ip address dhcp command was not issued on interface Gi0/1."],
        correctAnswers: [0],
        type: 'single',
        explanation: "The ip helper-address command must be applied on the interface facing the DHCP clients, not the DHCP server.",
        imageUrl: "/CCNA2/rx9.png"
    },
    {
        id: 45,
        question: "What two default wireless router settings can affect network security? (Choose two.)",
        options: ["The SSID is broadcast.", "MAC address filtering is enabled.", "WEP encryption is enabled.", "The wireless channel is automatically selected.", "A well-known administrator password is set."],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "Broadcasting the SSID and using a well-known administrator password are security risks.",
        imageUrl: "/CCNA2/i232273v1n1_232273.png"
    },
    {
        id: 46,
        question: "What is the common term given to SNMP log messages that are generated by network devices and sent to the SNMP server?",
        options: ["traps", "acknowledgments", "auditing", "warnings"],
        correctAnswers: [0],
        type: 'single',
        explanation: "SNMP traps are log messages generated by network devices and sent to the SNMP server."
    },
    {
        id: 47,
        question: "A network administrator is adding a new WLAN on a Cisco 3500 series WLC. Which tab should the administrator use to create a new VLAN interface to be used for the new WLAN?",
        options: ["WIRELESS", "MANAGEMENT", "CONTROLLER", "WLANs"],
        correctAnswers: [2],
        type: 'single',
        explanation: "The CONTROLLER tab is used to create a new VLAN interface on a Cisco WLC."
    },
    {
        id: 48,
        question: "A network administrator is configuring a WLAN. Why would the administrator change the default DHCP IPv4 addresses on an AP?",
        options: ["to restrict access to the WLAN by authorized users only", "to monitor the operation of the wireless network", "to reduce outsiders intercepting data or accessing the wireless network by using a well-known address range", "to reduce the risk of interference by external devices such as microwave ovens"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Changing default DHCP addresses reduces the risk of outsiders accessing the network using well-known address ranges."
    },
    {
        id: 49,
        question: "Which two functions are performed by a WLC when using split media access control (MAC)? (Choose two.)",
        options: ["packet acknowledgments and retransmissions", "frame queuing and packet prioritization", "beacons and probe responses", "frame translation to other protocols", "association and re-association of roaming clients"],
        correctAnswers: [3, 4],
        type: 'multiple',
        explanation: "WLC handles frame translation and association/re-association of roaming clients in split MAC architecture."
    },
    {
        id: 50,
        question: "On what switch ports should BPDU guard be enabled to enhance STP stability?",
        options: ["all PortFast-enabled ports", "only ports that are elected as designated ports", "only ports that attach to a neighboring switch", "all trunk ports that are not root ports"],
        correctAnswers: [0],
        type: 'single',
        explanation: "BPDU guard should be enabled on all PortFast-enabled ports to prevent rogue switch connections."
    },
    {
        id: 51,
        question: "Which network attack is mitigated by enabling BPDU guard?",
        options: ["rogue switches on a network", "CAM table overflow attacks", "MAC address spoofing", "rogue DHCP servers on a network"],
        correctAnswers: [0],
        type: 'single',
        explanation: "BPDU guard prevents rogue switches from being connected to the network by disabling ports that receive BPDUs."
    },
    {
        id: 52,
        question: "Why is DHCP snooping required when using the Dynamic ARP Inspection feature?",
        options: ["It relies on the settings of trusted and untrusted ports set by DHCP snooping.", "It uses the MAC address table to verify the default gateway IP address.", "It redirects ARP requests to the DHCP server for verification.", "It uses the MAC-address-to-IP-address binding database to validate an ARP packet."],
        correctAnswers: [3],
        type: 'single',
        explanation: "DAI relies on DHCP snooping's MAC-address-to-IP-address binding database to validate ARP packets."
    },
    {
        id: 53,
        question: "Router R1 has an OSPF neighbor relationship with the ISP router. The floating static route command ip route 0.0.0.0 0.0.0.0 S0/0/1 100 was issued but traffic uses the backup link even when OSPF is up. Which change should be made?",
        options: ["Change the administrative distance to 120.", "Add the next hop neighbor address of 192.168.0.36.", "Change the destination network to 192.168.0.34.", "Change the administrative distance to 1."],
        correctAnswers: [0],
        type: 'single',
        explanation: "The AD needs to be higher than OSPF (110). Change it to 120 so traffic only uses the backup when OSPF fails.",
        imageUrl: "/CCNA2/i210868v1n2_210868.gif"
    },
    {
        id: 54,
        question: "Refer to the exhibit. What is the metric to forward a data packet with the IPv6 destination address 2001:DB8:ACAD:E:240:BFF:FED4:9DD2?",
        options: ["90", "128", "2170112", "2681856", "2682112", "3193856"],
        correctAnswers: [4],
        type: 'single',
        explanation: "The route to forward the packet to 2001:DB8:ACAD:E::/64 has Serial 0/0/1 as exit interface and 2682112 as the cost.",
        imageUrl: "/CCNA2/CCNA-2-v7-exam-answers.png"
    },
    {
        id: 55,
        question: "A network administrator is configuring a new Cisco switch for remote management access. Which three items must be configured on the switch for the task? (Choose three.)",
        options: ["IP address", "VTP domain", "vty lines", "default VLAN", "default gateway", "loopback address"],
        correctAnswers: [0, 2, 4],
        type: 'multiple',
        explanation: "For remote management, configure an IP address, vty lines (for Telnet/SSH), and a default gateway."
    },
    {
        id: 56,
        question: "Refer to the exhibit. Which statement shown in the output allows router R1 to respond to stateless DHCPv6 requests?",
        options: ["ipv6 nd other-config-flag", "prefix-delegation 2001:DB8:8::/48 00030001000E84244E70", "ipv6 dhcp server LAN1", "ipv6 unicast-routing", "dns-server 2001:DB8:8::8"],
        correctAnswers: [0],
        type: 'single',
        explanation: "The ipv6 nd other-config-flag command enables RA messages indicating additional info is available from a stateless DHCPv6 server.",
        imageUrl: "/CCNA2/CCNA-2-v7-exam-answers-56.png"
    },
    {
        id: 58,
        question: "A technician is troubleshooting a slow WLAN and decides to use the split-the-traffic approach. Which two parameters would have to be configured? (Choose two.)",
        options: ["Configure the 5 GHz band for streaming multimedia and time sensitive traffic.", "Configure security mode to WPA Personal TKIP/AES for one network and WPA2 for the other.", "Configure the 2.4 GHz band for basic internet traffic that is not time sensitive.", "Configure the security mode to WPA Personal TKIP/AES for both networks.", "Configure a common SSID for both split networks."],
        correctAnswers: [0, 2],
        type: 'multiple',
        explanation: "Split traffic by using 5 GHz for time-sensitive traffic and 2.4 GHz for basic internet traffic."
    },
    {
        id: 59,
        question: "A company has just switched to a new ISP. The ISP has completed and checked the connection from its site to the company. However, employees cannot access the internet. What should be done or checked?",
        options: ["Verify that the static route to the server is present.", "Check the configuration on the floating static route and adjust the AD.", "Ensure that the old default route has been removed from the company edge routers.", "Create a floating static route to that network."],
        correctAnswers: [2],
        type: 'single',
        explanation: "The old default route pointing to the previous ISP must be removed from the edge routers."
    },
    {
        id: 60,
        question: "Which information does a switch use to populate the MAC address table?",
        options: ["the destination MAC address and the incoming port", "the destination MAC address and the outgoing port", "the source and destination MAC addresses and the incoming port", "the source and destination MAC addresses and the outgoing port", "the source MAC address and the incoming port", "the source MAC address and the outgoing port"],
        correctAnswers: [4],
        type: 'single',
        explanation: "A switch uses the source MAC address and the incoming port to populate the MAC address table."
    },
    {
        id: 61,
        question: "Refer to the exhibit. A network administrator is reviewing the configuration of switch S1. Which protocol has been implemented to group multiple physical ports into one logical link?",
        options: ["PAgP", "DTP", "LACP", "STP"],
        correctAnswers: [0],
        type: 'single',
        explanation: "PAgP uses auto and desirable modes for EtherChannel. The configuration shows desirable mode indicating PAgP.",
        imageUrl: "/CCNA2/p23-1.png"
    },
    {
        id: 62,
        question: "Which type of static route is configured with a greater administrative distance to provide a backup route to a route learned from a dynamic routing protocol?",
        options: ["floating static route", "default static route", "summary static route", "standard static route"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Floating static routes have a higher AD and serve as backup routes when primary dynamic routes fail."
    },
    {
        id: 63,
        question: "What action takes place when a frame entering a switch has a unicast destination MAC address appearing in the MAC address table?",
        options: ["The switch updates the refresh timer for the entry.", "The switch forwards the frame out of the specified port.", "The switch purges the entire MAC address table.", "The switch replaces the old entry and uses the more current port."],
        correctAnswers: [1],
        type: 'single',
        explanation: "When the destination MAC is found in the table, the switch forwards the frame out the associated port."
    },
    {
        id: 64,
        question: "Which command will create a static route on R2 in order to reach PC B (172.16.2.0/24 network)?",
        options: ["R2(config)# ip route 172.16.2.1 255.255.255.0 172.16.3.1", "R2(config)# ip route 172.16.2.0 255.255.255.0 172.16.2.254", "R2(config)# ip route 172.16.2.0 255.255.255.0 172.16.3.1", "R2(config)# ip route 172.16.3.0 255.255.255.0 172.16.2.254"],
        correctAnswers: [2],
        type: 'single',
        explanation: "The syntax is ip route destination-network mask next-hop-ip. To reach 172.16.2.0/24, use next-hop 172.16.3.1.",
        imageUrl: "/CCNA2/i246203v1n1_2107451.jpg"
    },
    {
        id: 65,
        question: "What protocol or technology allows data to transmit over redundant switch links?",
        options: ["EtherChannel", "DTP", "STP", "VTP"],
        correctAnswers: [0],
        type: 'single',
        explanation: "EtherChannel allows multiple physical links to be bundled into one logical link for redundancy and increased bandwidth."
    },
    {
        id: 66,
        question: "Refer to the exhibit. Which three hosts will receive ARP requests from host A, assuming port Fa0/4 on both switches is configured to carry traffic for multiple VLANs? (Choose three.)",
        options: ["host B", "host C", "host D", "host E", "host F", "host G"],
        correctAnswers: [1, 2, 4],
        type: 'multiple',
        explanation: "ARP requests are sent only within the same VLAN. Hosts C, D, and F are in the same VLAN as host A.",
        imageUrl: "/CCNA2/46.jpg"
    },
    {
        id: 67,
        question: "Refer to the exhibit. Host C is unable to ping host D and host E is unable to ping host F. What action should the administrator take to enable this communication?",
        options: ["Associate hosts A and B with VLAN 10 instead of VLAN 1.", "Configure either trunk port in the dynamic desirable mode.", "Include a router in the topology.", "Remove the native VLAN from the trunk."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Configure trunk ports in dynamic desirable mode to establish the trunk link between switches.",
        imageUrl: "/CCNA2/hinh5.png"
    },
    {
        id: 68,
        question: "What is the effect of entering the shutdown configuration command on a switch?",
        options: ["It enables BPDU guard on a specific port.", "It disables an unused port.", "It enables portfast on a specific switch interface.", "It disables DTP on a non-trunking interface."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The shutdown command disables an interface on the switch."
    },
    {
        id: 69,
        question: "What would be the primary reason an attacker would launch a MAC address overflow attack?",
        options: ["so that the switch stops forwarding traffic", "so that legitimate hosts cannot obtain a MAC address", "so that the attacker can see frames that are destined for other hosts", "so that the attacker can execute arbitrary code on the switch"],
        correctAnswers: [2],
        type: 'single',
        explanation: "MAC address overflow attacks cause the switch to flood frames, allowing the attacker to see traffic destined for other hosts."
    },
    {
        id: 70,
        question: "During the AAA process, when will authorization be implemented?",
        options: ["Immediately after successful authentication against an AAA data source", "Immediately after AAA accounting and auditing receives detailed reports", "Immediately after an AAA client sends authentication information", "Immediately after the determination of which resources a user can access"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Authorization occurs immediately after successful authentication to determine what resources the user can access."
    },
    {
        id: 71,
        question: "A company security policy requires that all MAC addressing be dynamically learned and added to both the MAC address table and the running configuration. Which port security configuration will accomplish this?",
        options: ["auto secure MAC addresses", "dynamic secure MAC addresses", "static secure MAC addresses", "sticky secure MAC addresses"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Sticky secure MAC addressing dynamically learns MAC addresses and stores them in the running configuration."
    },
    {
        id: 72,
        question: "Which three Wi-Fi standards operate in the 2.4GHz range of frequencies? (Choose three.)",
        options: ["802.11a", "802.11b", "802.11g", "802.11n", "802.11ac"],
        correctAnswers: [1, 2, 3],
        type: 'multiple',
        explanation: "802.11b and 802.11g operate in 2.4GHz only. 802.11n can operate in both 2.4GHz and 5GHz."
    },
    {
        id: 73,
        question: "To obtain an overview of spanning tree status, which two items of information will the show spanning-tree command display? (Choose two.)",
        options: ["The root bridge BID.", "The role of the ports in all VLANs.", "The status of native VLAN ports.", "The number of broadcasts received on each root port.", "The IP address of the management VLAN interface."],
        correctAnswers: [0, 1],
        type: 'multiple',
        explanation: "The show spanning-tree command displays the root bridge BID and the role of ports in all VLANs."
    },
    {
        id: 74,
        question: "Refer to the exhibit. Which trunk link will not forward any traffic after the root bridge election process is complete?",
        options: ["Trunk1", "Trunk2", "Trunk3", "Trunk4"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Trunk2 will be blocked by STP to prevent a loop in the network.",
        imageUrl: "/CCNA2/i223534v1n1_223534.jpg"
    },
    {
        id: 75,
        question: "Which method of IPv6 prefix assignment relies on the prefix contained in RA messages?",
        options: ["EUI-64", "SLAAC", "static", "stateful DHCPv6"],
        correctAnswers: [1],
        type: 'single',
        explanation: "SLAAC (Stateless Address Autoconfiguration) uses the prefix from RA messages to create an IPv6 address."
    },
    {
        id: 76,
        question: "Which two protocols are used to provide server-based AAA authentication? (Choose two.)",
        options: ["802.1x", "SSH", "SNMP", "TACACS+", "RADIUS"],
        correctAnswers: [3, 4],
        type: 'multiple',
        explanation: "TACACS+ and RADIUS are protocols used for server-based AAA authentication."
    },
    {
        id: 77,
        question: "A network administrator is configuring a WLAN. Why would the administrator disable the broadcast feature for the SSID?",
        options: ["to eliminate outsiders scanning for available SSIDs in the area", "to reduce the risk of interference by external devices", "to reduce the risk of unauthorized APs being added to the network", "to provide privacy and integrity to wireless traffic by using encryption"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Disabling SSID broadcast prevents outsiders from easily discovering the wireless network."
    },
    {
        id: 78,
        question: "Which mitigation technique would prevent rogue servers from providing false IP configuration parameters to clients?",
        options: ["implementing port security", "turning on DHCP snooping", "disabling CDP on edge ports", "implementing port-security on edge ports"],
        correctAnswers: [1],
        type: 'single',
        explanation: "DHCP snooping prevents rogue DHCP servers from providing false IP configuration to clients."
    },
    {
        id: 79,
        question: "A network administrator configures port security to allow up to two MAC addresses. When the maximum is reached, a frame with unknown source MAC is dropped and notification sent. Which security violation mode should be configured?",
        options: ["shutdown", "restrict", "warning", "protect"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Restrict mode drops packets with unknown source addresses and sends a notification (syslog message)."
    },
    {
        id: 80,
        question: "What protocol or technology defines a group of routers, one of them defined as active and another one as standby?",
        options: ["EtherChannel", "VTP", "HSRP", "DTP"],
        correctAnswers: [2],
        type: 'single',
        explanation: "HSRP (Hot Standby Router Protocol) defines active and standby routers for gateway redundancy."
    },
    {
        id: 81,
        question: "Refer to the exhibit. After attempting to enter the configuration shown on router RTA, an administrator receives an error and users on VLAN 20 report they cannot reach users on VLAN 30. What is causing the problem?",
        options: ["There is no address on Fa0/0 to use as a default gateway.", "RTA is using the same subnet for VLAN 20 and VLAN 30.", "Dot1q does not support subinterfaces.", "The no shutdown command should have been issued on Fa0/0.20 and Fa0/0.30."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Both VLAN 20 and VLAN 30 subinterfaces are configured with the same subnet, causing a conflict.",
        imageUrl: "/CCNA2/sdsfr43f.jpg"
    },
    {
        id: 83,
        question: "A technician is configuring a router for a small company with multiple WLANs and doesn't need dynamic routing. What should be done?",
        options: ["Verify that there is not a default route in any edge router routing tables.", "Create static routes to all internal networks and a default route to the internet.", "Create extra static routes to the same location with an AD of 1.", "Check the statistics on the default route for oversaturation."],
        correctAnswers: [1],
        type: 'single',
        explanation: "For a simple network without dynamic routing, create static routes to internal networks and a default route to the internet."
    },
    {
        id: 84,
        question: "A company is deploying 802.11g in a large warehouse. Which channel assignments on multiple access points will ensure non-overlapping channels?",
        options: ["channels 1, 5, and 9", "channels 1, 6, and 11", "channels 1, 7, and 13", "channels 2, 6, and 10"],
        correctAnswers: [1],
        type: 'single',
        explanation: "In the 2.4GHz band, channels 1, 6, and 11 are the only non-overlapping channel combination."
    },
    {
        id: 85,
        question: "A network administrator is configuring WLAN security using WPA2 PSK method. What credential do users need to connect to the WLAN?",
        options: ["the company username and password through Active Directory", "a key that matches the key on the AP", "a user passphrase", "a username and password configured on the AP"],
        correctAnswers: [1],
        type: 'single',
        explanation: "With WPA2 PSK, users need the pre-shared key that matches the key configured on the access point."
    },
    {
        id: 86,
        question: "Refer to the exhibit. What are the possible port roles for ports A, B, C, and D in this RSTP-enabled network?",
        options: ["alternate, designated, root, root", "designated, alternate, root, root", "alternate, root, designated, root", "designated, root, alternate, root"],
        correctAnswers: [0],
        type: 'single',
        explanation: "In RSTP, with S1 as root bridge: A=alternate, B=designated, C and D=root ports.",
        imageUrl: "/CCNA2/CCNA-2-v7-Modules-5-6-Redundant-Networks-Exam.png"
    },
    {
        id: 87,
        question: "Refer to the exhibit. Which static route would create a backup route to the 172.16.1.0 network that is only used if the primary RIP learned route fails?",
        options: ["ip route 172.16.1.0 255.255.255.0 s0/0/0", "ip route 172.16.1.0 255.255.255.0 s0/0/0 121", "ip route 172.16.1.0 255.255.255.0 s0/0/0 111", "ip route 172.16.1.0 255.255.255.0 s0/0/0 91"],
        correctAnswers: [1],
        type: 'single',
        explanation: "RIP has an AD of 120. A floating static route needs AD > 120, so 121 would work as a backup.",
        imageUrl: "/CCNA2/i282902v1n1_Routing3-1.png"
    },
    {
        id: 88,
        question: "What mitigation plan is best for thwarting a DoS attack that is creating a MAC address table overflow?",
        options: ["Disable DTP.", "Disable STP.", "Enable port security.", "Place unused ports in an unused VLAN."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Port security limits the number of MAC addresses per port, preventing MAC address table overflow attacks."
    },
    {
        id: 89,
        question: "A network engineer decides to configure a 5 GHz frequency band SSID for streaming media. Why might this improve wireless performance?",
        options: ["Requiring users to switch to 5 GHz is inconvenient and results in fewer users.", "The 5 GHz band has more channels and is less crowded than the 2.4 GHz band.", "The 5 GHz band has a greater range and is interference-free.", "Only users with the latest NICs can use 5 GHz, reducing usage."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The 5 GHz band has more channels and is less crowded, making it more suited for high-bandwidth applications."
    },
    {
        id: 90,
        question: "Which DHCPv4 message will a client send to accept an IPv4 address that is offered by a DHCP server?",
        options: ["broadcast DHCPACK", "broadcast DHCPREQUEST", "unicast DHCPACK", "unicast DHCPREQUEST"],
        correctAnswers: [1],
        type: 'single',
        explanation: "The client sends a broadcast DHCPREQUEST to accept the offered IP address and notify other DHCP servers."
    },
    {
        id: 91,
        question: "Refer to the exhibit. Which destination MAC address is used when frames are sent from the workstation to the default gateway?",
        options: ["MAC address of the virtual router", "MAC address of the standby router", "MAC addresses of both the forwarding and standby routers", "MAC address of the forwarding router"],
        correctAnswers: [0],
        type: 'single',
        explanation: "The virtual IP address resolves to the virtual MAC address in HSRP/VRRP configurations.",
        imageUrl: "/CCNA2/i223091v1n1_223091.png"
    },
    {
        id: 92,
        question: "After a host has generated an IPv6 address by using DHCPv6 or SLAAC, how does the host verify that the address is unique?",
        options: ["The host sends an ICMPv6 echo request message.", "The host sends an ICMPv6 neighbor solicitation message to the learned address and if no neighbor advertisement is returned, the address is considered unique.", "The host checks the local neighbor cache for the learned address.", "The host sends an ARP request and waits for a reply."],
        correctAnswers: [1],
        type: 'single',
        explanation: "DAD (Duplicate Address Detection) uses ICMPv6 neighbor solicitation to verify address uniqueness."
    },
    {
        id: 93,
        question: "Match the purpose with its DHCP message type. (Not all options are used.)",
        type: 'matching',
        leftItems: ["locate any available DHCP server on a network", "identify the explicit server and lease offer to accept", "acknowledge that the lease is successful", "suggest a lease to a client"],
        rightItems: ["DHCPDISCOVER", "DHCPREQUEST", "DHCPACK", "DHCPOFFER", "DHCPNAK"],
        correctMatches: { 0: 0, 1: 1, 2: 2, 3: 3 },
        options: [],
        correctAnswers: [],
        explanation: "DHCPDISCOVER finds servers, DHCPREQUEST accepts lease, DHCPACK confirms, DHCPOFFER suggests.",
        imageUrl: "/CCNA2/2020-01-20_232028.jpg"
    },
    {
        id: 94,
        question: "Which protocol adds security to remote connections?",
        options: ["FTP", "HTTP", "NetBEUI", "POP", "SSH"],
        correctAnswers: [4],
        type: 'single',
        explanation: "SSH allows secure remote connections for monitoring and troubleshooting network devices."
    },
    {
        id: 95,
        question: "Refer to the exhibit. A network administrator is verifying inter-VLAN routing. PC2 cannot communicate with PC1. Based on the output, what is the possible cause of the problem?",
        options: ["Gi0/0 is not configured as a trunk port.", "The command interface GigabitEthernet0/0.5 was entered incorrectly.", "There is no IP address configured on the interface Gi0/0.", "The no shutdown command is not entered on subinterfaces.", "The encapsulation dot1Q 5 command contains the wrong VLAN."],
        correctAnswers: [4],
        type: 'single',
        explanation: "The encapsulation dot1Q command has the wrong VLAN number, causing inter-VLAN routing to fail.",
        imageUrl: "/CCNA2/CCNA2-v7-Modules-1-4-Switching-Concepts-VLANs-and-InterVLAN-Routing-Exam-Answers-44.png"
    },
    {
        id: 96,
        question: "Refer to the exhibit. A network administrator is configuring inter-VLAN routing. What is the missing parameter shown as the highlighted question mark in the graphic?",
        options: ["It identifies the subinterface.", "It identifies the VLAN number.", "It identifies the native VLAN number.", "It identifies the type of encapsulation that is used.", "It identifies the number of hosts that are allowed."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The missing parameter identifies the VLAN number in the encapsulation dot1Q command.",
        imageUrl: "/CCNA2/CCNA2-v7-Modules-1-4-Switching-Concepts-VLANs-and-InterVLAN-Routing-Exam-Answers-74.png"
    },
    {
        id: 98,
        question: "What network attack seeks to create a DoS for clients by preventing them from being able to obtain a DHCP lease?",
        options: ["IP address spoofing", "DHCP starvation", "CAM table attack", "DHCP spoofing"],
        correctAnswers: [1],
        type: 'single',
        explanation: "DHCP starvation sends many DHCPDISCOVER messages to lease all available IP addresses, denying them to legitimate hosts."
    },
    {
        id: 99,
        question: "Refer to the exhibit. If the IP addresses of the default gateway router and the DNS server are correct, what is the configuration problem?",
        options: ["The DNS server and the default gateway router should be in the same subnet.", "The IP address of the default gateway router is not contained in the excluded address list.", "The default-router and dns-server commands need to be configured with subnet masks.", "The IP address of the DNS server is not contained in the excluded address list."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The default gateway address should be in the excluded address list to prevent it from being assigned to clients.",
        imageUrl: "/CCNA2/the-IP-addresses-of-the-default-gateway-router-and-the-DNS-server-are-correct-what-is-the.png"
    },
    {
        id: 100,
        question: "What two commands will allow hosts on the new subnet to receive addresses from the DHCPv4 server? (Choose two.)",
        options: ["R1(config-if)# ip helper-address 10.2.0.250", "R1(config)# interface G0/1", "R1(config)# interface G0/0", "R2(config-if)# ip helper-address 10.2.0.250", "R2(config)# interface G0/0", "R1(config-if)# ip helper-address 10.1.0.254"],
        correctAnswers: [0, 2],
        type: 'multiple',
        explanation: "Configure ip helper-address on the interface facing the DHCP clients (G0/0) with the DHCP server address.",
        imageUrl: "/CCNA2/2017-07-05_183851-1.jpg"
    },
    {
        id: 101,
        question: "What protocol or technology uses source IP to destination IP as a load-balancing mechanism?",
        options: ["VTP", "EtherChannel", "DTP", "STP"],
        correctAnswers: [1],
        type: 'single',
        explanation: "EtherChannel can use source-destination IP pairs for load balancing across bundled links."
    },
    {
        id: 102,
        question: "What protocol should be disabled to help mitigate VLAN attacks?",
        options: ["CDP", "ARP", "STP", "DTP"],
        correctAnswers: [3],
        type: 'single',
        explanation: "DTP (Dynamic Trunking Protocol) should be disabled to prevent VLAN hopping attacks."
    },
    {
        id: 103,
        question: "What protocol or technology requires switches to be in server mode or client mode?",
        options: ["EtherChannel", "STP", "VTP", "DTP"],
        correctAnswers: [2],
        type: 'single',
        explanation: "VTP (VLAN Trunking Protocol) uses server and client modes for VLAN database synchronization."
    },
    {
        id: 104,
        question: "What are two reasons a network administrator would segment a network with a Layer 2 switch? (Choose two.)",
        options: ["to create fewer collision domains", "to enhance user bandwidth", "to create more broadcast domains", "to eliminate virtual circuits", "to isolate traffic between segments", "to isolate ARP request messages from the rest of the network"],
        correctAnswers: [1, 4],
        type: 'multiple',
        explanation: "Layer 2 switches enhance user bandwidth and isolate traffic between segments by creating separate collision domains."
    },
    {
        id: 105,
        question: "What command will enable a router to begin sending messages that allow it to configure a link-local address without using an IPv6 DHCP server?",
        options: ["a static route", "the ipv6 route ::/0 command", "the ipv6 unicast-routing command", "the ip routing command"],
        correctAnswers: [2],
        type: 'single',
        explanation: "The ipv6 unicast-routing command enables IPv6 routing and allows the router to send RA messages."
    },
    {
        id: 106,
        question: "A network administrator is using the router-on-a-stick model for inter-VLAN routing. What configuration should be made on the switch port that connects to the router?",
        options: ["Configure it as a trunk port and allow only untagged traffic.", "Configure the port as an access port and a member of VLAN1.", "Configure the port as an 802.1q trunk port.", "Configure the port as a trunk port and assign it to VLAN1."],
        correctAnswers: [2],
        type: 'single',
        explanation: "The port connecting to the router for router-on-a-stick must be configured as an 802.1Q trunk port."
    },
    {
        id: 107,
        question: "What are three techniques for mitigating VLAN attacks? (Choose three.)",
        options: ["Use private VLANs.", "Enable BPDU guard.", "Enable trunking manually", "Enable Source Guard.", "Disable DTP.", "Set the native VLAN to an unused VLAN."],
        correctAnswers: [2, 4, 5],
        type: 'multiple',
        explanation: "Mitigate VLAN attacks by manually enabling trunking, disabling DTP, and setting native VLAN to an unused VLAN."
    },
    {
        id: 109,
        question: "In which situation would a technician use the show interfaces switch command?",
        options: ["to determine if remote access is enabled", "when packets are being dropped from a particular directly attached host", "when an end device can reach local devices, but not remote devices", "to determine the MAC address of a directly attached network device"],
        correctAnswers: [1],
        type: 'single',
        explanation: "The show interfaces command detects media errors and shows if packets are being sent and received."
    },
    {
        id: 110,
        question: "What is a drawback of the local database method of securing device access that can be solved by using AAA with centralized servers?",
        options: ["There is no ability to provide accountability.", "User accounts must be configured locally on each device, which is an unscalable authentication solution.", "It is very susceptible to brute-force attacks because there is no username.", "The passwords can only be stored in plain text in the running configuration."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Local database requires configuring user accounts on each device, making it unscalable. AAA servers centralize this."
    },
    {
        id: 111,
        question: "What action does a DHCPv4 client take if it receives more than one DHCPOFFER from multiple DHCP servers?",
        options: ["It sends a DHCPREQUEST that identifies which lease offer the client is accepting.", "It sends a DHCPNAK and begins the DHCP process over again.", "It discards both offers and sends a new DHCPDISCOVER.", "It accepts both DHCPOFFER messages and sends a DHCPACK."],
        correctAnswers: [0],
        type: 'single',
        explanation: "The client sends a DHCPREQUEST identifying which offer it accepts, notifying all servers of its choice."
    },
    {
        id: 112,
        question: "The network administrator is configuring port security on switch SWC. What can be concluded from the show port-security interface fa 0/2 output? (Choose three.)",
        options: ["Three security violations have been detected on this interface.", "This port is currently up.", "The port is configured as a trunk link.", "Security violations will cause this port to shut down immediately.", "There is no device currently connected to this port.", "The switch port mode for this interface is access mode."],
        correctAnswers: [1, 3, 5],
        type: 'multiple',
        explanation: "The port is up, security violations cause shutdown, and the port is in access mode (required for port security).",
        imageUrl: "/CCNA2/112_2022-06-24_113833.jpg"
    },
    {
        id: 113,
        question: "What method of wireless authentication is dependent on a RADIUS authentication server?",
        options: ["WEP", "WPA Personal", "WPA2 Personal", "WPA2 Enterprise"],
        correctAnswers: [3],
        type: 'single',
        explanation: "WPA2 Enterprise uses RADIUS servers for authentication, providing centralized user management."
    },
    {
        id: 114,
        question: "A network administrator has found a user sending a double-tagged 802.1Q frame to a switch. What is the best solution to prevent this type of attack?",
        options: ["The native VLAN number used on any trunk should be one of the active data VLANs.", "The VLANs for user access ports should be different VLANs than any native VLANs used on trunk ports.", "Trunk ports should be configured with port security.", "Trunk ports should use the default VLAN as the native VLAN number."],
        correctAnswers: [1],
        type: 'single',
        explanation: "User access ports should be in different VLANs than native VLANs on trunks to prevent double-tagging attacks."
    },
    {
        id: 115,
        question: "Refer to the exhibit. Which two conclusions can be drawn from the output? (Choose two.)",
        options: ["The EtherChannel is down.", "The port channel ID is 2.", "The port channel is a Layer 3 channel.", "The bundle is fully operational.", "The load-balancing method used is source port to destination port."],
        correctAnswers: [0, 1],
        type: 'multiple',
        explanation: "The output shows the EtherChannel is down and identifies port channel 2.",
        imageUrl: "/CCNA2/i221267v1n1_item2.jpg"
    },
    {
        id: 117,
        question: "On a Cisco 3504 WLC Summary page (Advanced > Summary), which tab allows a network administrator to configure a particular WLAN with a WPA2 policy?",
        options: ["WLANs", "SECURITY", "WIRELESS", "MANAGEMENT"],
        correctAnswers: [0],
        type: 'single',
        explanation: "The WLANs tab allows configuration of WLANs including security, QoS, and policy-mapping."
    },
    {
        id: 118,
        question: "Which command issued on router HQ will configure a default route to the Internet for IPv6 destination networks not listed in the routing table?",
        options: ["ipv6 route ::/0 serial 0/0/0", "ip route 0.0.0.0 0.0.0.0 serial 0/1/1", "ipv6 route ::1/0 serial 0/1/1", "ipv6 route ::/0 serial 0/1/1"],
        correctAnswers: [3],
        type: 'single',
        explanation: "The IPv6 default route ::/0 with exit interface serial 0/1/1 sends traffic to the Internet.",
        imageUrl: "/CCNA2/2020-04-28_073221.jpg"
    },
    {
        id: 119,
        question: "Users are complaining of sporadic access to the internet every afternoon. What should be done or checked?",
        options: ["Create static routes to all internal networks and a default route to the internet.", "Verify that there is not a default route in any of the edge router routing tables.", "Create a floating static route to that network.", "Check the statistics on the default route for oversaturation."],
        correctAnswers: [3],
        type: 'single',
        explanation: "Sporadic access at specific times suggests bandwidth saturation. Check statistics on the default route."
    },
    {
        id: 120,
        question: "What action takes place when the source MAC address of a frame entering a switch appears in the MAC address table associated with a different port?",
        options: ["The switch purges the entire MAC address table.", "The switch replaces the old entry and uses the more current port.", "The switch updates the refresh timer for the entry.", "The switch forwards the frame out of the specified port."],
        correctAnswers: [1],
        type: 'single',
        explanation: "When a MAC address is learned on a different port, the switch updates the entry with the new port."
    },
    {
        id: 121,
        question: "A network administrator is configuring a WLAN. Why would the administrator use a WLAN controller?",
        options: ["to centralize management of multiple WLANs", "to provide privacy and integrity to wireless traffic by using encryption", "to facilitate group configuration and management of multiple WLANs through a WLC", "to provide prioritized service for time-sensitive applications"],
        correctAnswers: [2],
        type: 'single',
        explanation: "A WLAN controller facilitates group configuration and management of multiple WLANs."
    },
    {
        id: 123,
        question: "Which three statements accurately describe duplex and speed settings on Cisco 2960 switches? (Choose three.)",
        options: ["An autonegotiation failure can result in connectivity issues.", "When the speed is set to 1000 Mb/s, the switch ports will operate in full-duplex mode.", "The duplex and speed settings of each switch port can be manually configured.", "Enabling autonegotiation on a hub will prevent mismatched port speeds.", "By default, the speed is set to 100 Mb/s and the duplex mode is set to autonegotiation.", "By default, the autonegotiation feature is disabled."],
        correctAnswers: [0, 1, 2],
        type: 'multiple',
        explanation: "Autonegotiation failures cause issues, 1000 Mb/s uses full-duplex, and settings can be manually configured."
    },
    {
        id: 124,
        question: "Refer to the exhibit. R1 is configured for inter-VLAN routing between VLAN 10 and VLAN 20. However, the devices cannot communicate. What is a possible cause for the problem?",
        options: ["The port Gi0/0 should be configured as trunk port.", "The encapsulation is misconfigured on a subinterface.", "A no shutdown command should be added in each subinterface configuration.", "The command interface gigabitEthernet 0/0.1 is wrong."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The encapsulation is misconfigured on a subinterface, preventing proper VLAN tagging.",
        imageUrl: "/CCNA2/2021-12-19_221231.jpg"
    },
    {
        id: 125,
        question: "A network administrator uses the spanning-tree portfast bpduguard default global configuration command but BPDU guard is not activated on all access ports. What is the cause of the issue?",
        options: ["BPDU guard needs to be activated in the interface configuration command mode.", "Access ports configured with root guard cannot be configured with BPDU guard.", "Access ports belong to different VLANs.", "PortFast is not configured on all access ports."],
        correctAnswers: [3],
        type: 'single',
        explanation: "The global BPDU guard command only applies to PortFast-enabled ports. PortFast must be configured first."
    },
    {
        id: 126,
        question: "Which two types of spanning tree protocols can cause suboptimal traffic flows because they assume only one spanning-tree instance for the entire bridged network? (Choose two.)",
        options: ["MSTP", "RSTP", "Rapid PVST+", "PVST+", "STP"],
        correctAnswers: [1, 4],
        type: 'multiple',
        explanation: "RSTP and STP use a single spanning tree instance, which can cause suboptimal traffic flows across VLANs."
    },
    {
        id: 127,
        question: "Refer to the exhibit. A network administrator is configuring router R1 for IPv6 address assignment. Which IPv6 global unicast address assignment scheme does the administrator intend to implement?",
        options: ["stateful", "stateless", "manual configuration", "SLAAC"],
        correctAnswers: [0],
        type: 'single',
        explanation: "The configuration shows stateful DHCPv6 where the server provides the full IPv6 address to clients.",
        imageUrl: "/CCNA2/i282171v1n1_282171.png"
    },
    {
        id: 128,
        question: "A WLAN engineer deploys a WLC and five wireless APs using CAPWAP with DTLS. The data traffic is not being encrypted. What is the most likely reason?",
        options: ["DTLS only provides authentication, not encryption.", "Although DTLS is enabled by default for the CAPWAP control channel, it is disabled by default for the data channel.", "DTLS is a protocol that only provides security between the AP and the wireless client.", "Data encryption requires a DTLS license on each access point."],
        correctAnswers: [1],
        type: 'single',
        explanation: "DTLS is enabled by default for the CAPWAP control channel but disabled by default for the data channel."
    },
    {
        id: 129,
        question: "A new switch is to be added to a network. The technicians should not be able to add new VLANs but the switch should receive VLAN updates. Which two steps must be performed? (Choose two.)",
        options: ["Configure the new switch as a VTP client.", "Configure the existing VTP domain name on the new switch.", "Configure an IP address on the new switch.", "Configure all ports of both switches to access mode.", "Enable VTP pruning."],
        correctAnswers: [0, 1],
        type: 'multiple',
        explanation: "Configure the switch as a VTP client and set the VTP domain name to receive but not modify VLANs."
    },
    {
        id: 130,
        question: "Refer to the exhibit. PC3 issues a broadcast IPv4 DHCP request. To which port will SW1 forward this request?",
        options: ["to Fa0/1, Fa0/2, and Fa0/3 only", "to Fa0/1, Fa0/2, Fa0/3, and Fa0/4", "to Fa0/1 only", "to Fa0/1, Fa0/2, and Fa0/4 only", "to Fa0/1 and Fa0/2 only"],
        correctAnswers: [0],
        type: 'single',
        explanation: "After power restoration, the switch forwards broadcasts to all ports except the incoming port (Fa0/4).",
        imageUrl: "/CCNA2/i245718v1n1_1.png"
    },
    {
        id: 131,
        question: "What action takes place when the source MAC address of a frame entering a switch is not in the MAC address table?",
        options: ["The switch forwards the frame out of the specified port.", "The switch will forward the frame out all ports except the incoming port.", "The switch adds the MAC address and incoming port number to the table.", "The switch adds a MAC address table entry for the destination MAC address."],
        correctAnswers: [2],
        type: 'single',
        explanation: "When a new source MAC is received, the switch adds it with the incoming port number to the MAC address table."
    },
    {
        id: 132,
        question: "Employees are unable to connect to servers on one of the internal networks. What should be done or checked?",
        options: ["Use the 'show ip interface brief' command to see if an interface is down.", "Verify that there is not a default route in any of the edge router routing tables.", "Create static routes to all internal networks and a default route to the internet.", "Check the statistics on the default route for oversaturation."],
        correctAnswers: [0],
        type: 'single',
        explanation: "Use 'show ip interface brief' to check if an interface is down, which could cause internal connectivity issues."
    },
    {
        id: 133,
        question: "What is the effect of entering the ip dhcp snooping configuration command on a switch?",
        options: ["It enables DHCP snooping globally on a switch.", "It enables PortFast globally on a switch.", "It disables DTP negotiations on trunking ports.", "It manually enables a trunk link."],
        correctAnswers: [0],
        type: 'single',
        explanation: "The ip dhcp snooping command enables DHCP snooping globally on the switch."
    },
    {
        id: 134,
        question: "An administrator notices that large numbers of packets are being dropped on a branch router. What should be done or checked?",
        options: ["Create static routes to all internal networks and a default route to the internet.", "Create extra static routes to the same location with an AD of 1.", "Check the statistics on the default route for oversaturation.", "Check the routing table for a missing static route."],
        correctAnswers: [3],
        type: 'single',
        explanation: "Dropped packets often indicate a missing route. Check the routing table for a missing static route."
    },
    {
        id: 135,
        question: "What are two switch characteristics that could help alleviate network congestion? (Choose two.)",
        options: ["fast internal switching", "large frame buffers", "store-and-forward switching", "low port density", "frame check sequence (FCS) check"],
        correctAnswers: [0, 1],
        type: 'multiple',
        explanation: "Fast internal switching and large frame buffers help alleviate network congestion on switches."
    },
    {
        id: 136,
        question: "What is a result of connecting two or more switches together?",
        options: ["The number of broadcast domains is increased.", "The size of the broadcast domain is increased.", "The number of collision domains is reduced.", "The size of the collision domain is increased."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Connecting switches together increases the size of the broadcast domain."
    },
    {
        id: 138,
        question: "Branch users were able to access a site in the morning but have had no connectivity since lunch. What should be checked?",
        options: ["Verify that the static route to the server is present.", "Use the 'show ip interface brief' command to see if an interface is down.", "Check the configuration on the floating static route and adjust the AD.", "Create a floating static route to that network."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Sudden connectivity loss often indicates an interface went down. Use 'show ip interface brief' to check."
    },
    {
        id: 139,
        question: "What is the effect of entering the switchport port-security configuration command on a switch?",
        options: ["It dynamically learns the L2 address and copies it to the running configuration.", "It enables port security on an interface.", "It enables port security globally on the switch.", "It restricts the number of discovery messages, per second, to be received."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The switchport port-security command enables port security on the specific interface."
    },
    {
        id: 140,
        question: "A network administrator is configuring a WLAN. Why would the administrator use multiple lightweight APs?",
        options: ["to centralize management of multiple WLANs", "to monitor the operation of the wireless network", "to provide prioritized service for time-sensitive applications", "to facilitate group configuration and management of multiple WLANs through a WLC"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Lightweight APs with a WLC facilitate centralized configuration and management of multiple WLANs."
    },
    {
        id: 141,
        question: "Refer to the exhibit. PC-A and PC-B are both in VLAN 60. PC-A is unable to communicate with PC-B. What is the problem?",
        options: ["The native VLAN should be VLAN 60.", "The native VLAN is being pruned from the link.", "The trunk has been configured with the switchport nonegotiate command.", "The VLAN that is used by PC-A is not in the list of allowed VLANs on the trunk."],
        correctAnswers: [3],
        type: 'single',
        explanation: "VLAN 60 is not in the list of allowed VLANs on the trunk, preventing communication.",
        imageUrl: "/CCNA2/i211586v1n1_Question-5.png"
    },
    {
        id: 142,
        question: "A network administrator is configuring a WLAN. Why would the administrator use RADIUS servers on the network?",
        options: ["to centralize management of multiple WLANs", "to restrict access to the WLAN by authorized, authenticated users only", "to facilitate group configuration and management of multiple WLANs through a WLC", "to monitor the operation of the wireless network"],
        correctAnswers: [1],
        type: 'single',
        explanation: "RADIUS servers restrict WLAN access to authorized and authenticated users only."
    },
    {
        id: 143,
        question: "What is the effect of entering the switchport mode access configuration command on a switch?",
        options: ["It enables BPDU guard on a specific port.", "It manually enables a trunk link.", "It disables an unused port.", "It disables DTP on a non-trunking interface."],
        correctAnswers: [3],
        type: 'single',
        explanation: "The switchport mode access command configures the port as an access port and disables DTP."
    },
    {
        id: 144,
        question: "A router is configured for stateless DHCPv6 but users are not receiving DNS server information. Which two lines should be verified? (Choose two.)",
        options: ["The domain-name line is included in the ipv6 dhcp pool section.", "The dns-server line is included in the ipv6 dhcp pool section.", "The ipv6 nd other-config-flag is entered for the interface that faces the LAN segment.", "The address prefix line is included in the ipv6 dhcp pool section.", "The ipv6 nd managed-config-flag is entered for the interface that faces the LAN segment."],
        correctAnswers: [1, 2],
        type: 'multiple',
        explanation: "For stateless DHCPv6, verify dns-server is in the pool and ipv6 nd other-config-flag is set on the interface."
    },
    {
        id: 145,
        question: "A network administrator is configuring a WLAN. Why would the administrator disable the broadcast feature for the SSID?",
        options: ["to eliminate outsiders scanning for available SSIDs in the area", "to centralize management of multiple WLANs", "to facilitate group configuration and management of multiple WLANs through a WLC", "to provide prioritized service for time-sensitive applications"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Disabling SSID broadcast eliminates outsiders from easily scanning for available wireless networks."
    },
    {
        id: 146,
        question: "Refer to the exhibit. An administrator is attempting to install an IPv6 static route on R1 to reach the network attached to R2. Connectivity is still failing. What error has been made?",
        options: ["The next hop address is incorrect.", "The interface is incorrect.", "The destination network is incorrect.", "The network prefix is incorrect."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The interface in the static route is incorrect. It should be the exit interface on R1 (s0/0/0).",
        imageUrl: "/CCNA2/2020-01-17_100010.jpg"
    },
    {
        id: 147,
        question: "What action takes place when a frame entering a switch has a unicast destination MAC address that is not in the MAC address table?",
        options: ["The switch updates the refresh timer for the entry.", "The switch resets the refresh timer on all MAC address table entries.", "The switch replaces the old entry and uses the more current port.", "The switch will forward the frame out all ports except the incoming port."],
        correctAnswers: [3],
        type: 'single',
        explanation: "When the destination MAC is unknown, the switch floods the frame out all ports except the incoming port."
    },
    {
        id: 148,
        question: "A junior technician added a route but traceroute shows wrong path and unreachable status. What should be checked?",
        options: ["Create a floating static route to that network.", "Check the configuration on the floating static route and adjust the AD.", "Check the configuration of the exit interface on the new static route.", "Verify that the static route to the server is present in the routing table."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Check the exit interface configuration on the new static route to ensure it points to the correct interface."
    },
    {
        id: 149,
        question: "What is the effect of entering the ip arp inspection vlan 10 configuration command on a switch?",
        options: ["It specifies the maximum number of L2 addresses allowed on a port.", "It enables DAI on specific switch interfaces previously configured with DHCP snooping.", "It enables DHCP snooping globally on a switch.", "It globally enables BPDU guard on all PortFast-enabled ports."],
        correctAnswers: [1],
        type: 'single',
        explanation: "The ip arp inspection vlan command enables Dynamic ARP Inspection on the specified VLAN."
    },
    {
        id: 150,
        question: "What protocol or technology manages trunk negotiations between switches?",
        options: ["VTP", "EtherChannel", "DTP", "STP"],
        correctAnswers: [2],
        type: 'single',
        explanation: "DTP (Dynamic Trunking Protocol) manages trunk negotiations between Cisco switches."
    },
    {
        id: 151,
        question: "A network administrator is configuring a WLAN. Why would the administrator apply WPA2 with AES to the WLAN?",
        options: ["to reduce the risk of unauthorized APs being added to the network", "to centralize management of multiple WLANs", "to provide prioritized service for time-sensitive applications", "to provide privacy and integrity to wireless traffic by using encryption"],
        correctAnswers: [3],
        type: 'single',
        explanation: "WPA2 with AES provides privacy and integrity to wireless traffic through strong encryption."
    },
    {
        id: 152,
        question: "Users on a LAN are unable to get to a company web server but are able to get elsewhere. What should be done?",
        options: ["Ensure that the old default route has been removed from the company edge routers.", "Verify that the static route to the server is present in the routing table.", "Check the configuration on the floating static route and adjust the AD.", "Create a floating static route to that network."],
        correctAnswers: [1],
        type: 'single',
        explanation: "If users can access other destinations but not the web server, verify the static route to the server exists."
    },
    {
        id: 153,
        question: "What IPv6 prefix is designed for link-local communication?",
        options: ["2001::/3", "ff00::/8", "fc::/07", "fe80::/10"],
        correctAnswers: [3],
        type: 'single',
        explanation: "The fe80::/10 prefix is used for IPv6 link-local addresses."
    },
    {
        id: 154,
        question: "What is the effect of entering the ip dhcp snooping limit rate 6 configuration command on a switch?",
        options: ["It displays the IP-to-MAC address associations for switch interfaces.", "It enables port security globally on the switch.", "It restricts the number of discovery messages, per second, to be received on the interface.", "It dynamically learns the L2 address and copies it to the running configuration."],
        correctAnswers: [2],
        type: 'single',
        explanation: "The ip dhcp snooping limit rate command restricts the number of DHCP messages per second on an interface."
    },
    {
        id: 155,
        question: "A network administrator is configuring a WLAN. Why would the administrator change the default DHCP IPv4 addresses on an AP?",
        options: ["to eliminate outsiders scanning for available SSIDs in the area", "to reduce the risk of unauthorized APs being added to the network", "to reduce outsiders intercepting data or accessing the wireless network by using a well-known address range", "to reduce the risk of interference by external devices such as microwave ovens"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Changing default DHCP addresses reduces the risk of outsiders using well-known address ranges."
    },
    {
        id: 156,
        question: "What is the effect of entering the ip arp inspection validate src-mac configuration command on a switch?",
        options: ["It checks the source L2 address in the Ethernet header against the sender L2 address in the ARP body.", "It disables all trunk ports.", "It displays the IP-to-MAC address associations for switch interfaces.", "It enables portfast on a specific switch interface."],
        correctAnswers: [0],
        type: 'single',
        explanation: "This command validates ARP packets by checking if the source MAC in Ethernet header matches the ARP body."
    },
    {
        id: 157,
        question: "What protocol or technology is a Cisco proprietary protocol that is automatically enabled on 2960 switches?",
        options: ["DTP", "STP", "VTP", "EtherChannel"],
        correctAnswers: [0],
        type: 'single',
        explanation: "DTP (Dynamic Trunking Protocol) is a Cisco proprietary protocol enabled by default on 2960 switches."
    },
    {
        id: 158,
        question: "What address and prefix length is used when configuring an IPv6 default static route?",
        options: ["::/0", "FF02::1/8", "0.0.0.0/0", "::1/128"],
        correctAnswers: [0],
        type: 'single',
        explanation: "The IPv6 default static route uses ::/0 as the destination network."
    },
    {
        id: 159,
        question: "What are two characteristics of Cisco Express Forwarding (CEF)? (Choose two.)",
        options: ["When a packet arrives, it is forwarded to the control plane where the CPU matches the destination.", "This is the fastest forwarding mechanism on Cisco routers and multilayer switches.", "Flow information for a packet is stored in the fast-switching cache.", "Packets are forwarded based on information in the FIB and an adjacency table.", "When a packet arrives, the CPU searches for a match in the fast-switching cache."],
        correctAnswers: [1, 3],
        type: 'multiple',
        explanation: "CEF is the fastest forwarding mechanism and uses the FIB and adjacency table for packet forwarding."
    },
    {
        id: 160,
        question: "Which term describes the role of a Cisco switch in the 802.1X port-based access control?",
        options: ["agent", "supplicant", "authenticator", "authentication server"],
        correctAnswers: [2],
        type: 'single',
        explanation: "In 802.1X, the Cisco switch acts as the authenticator between the supplicant and authentication server."
    },
    {
        id: 161,
        question: "Which Cisco solution helps prevent ARP spoofing and ARP poisoning attacks?",
        options: ["Dynamic ARP Inspection", "IP Source Guard", "DHCP Snooping", "Port Security"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Dynamic ARP Inspection (DAI) validates ARP packets to prevent ARP spoofing and poisoning attacks."
    },
    {
        id: 162,
        question: "What is an advantage of PVST+?",
        options: ["PVST+ optimizes performance through autoselection of the root bridge.", "PVST+ reduces bandwidth consumption compared to CST.", "PVST+ requires fewer CPU cycles for all switches.", "PVST+ optimizes performance on the network through load sharing."],
        correctAnswers: [3],
        type: 'single',
        explanation: "PVST+ allows load sharing by running a separate spanning tree instance for each VLAN."
    },
    {
        id: 163,
        question: "What protocol or technology uses a standby router to assume packet-forwarding responsibility if the active router fails?",
        options: ["EtherChannel", "DTP", "HSRP", "VTP"],
        correctAnswers: [2],
        type: 'single',
        explanation: "HSRP uses a standby router that takes over if the active router fails."
    },
    {
        id: 164,
        question: "What is the effect of entering the show ip dhcp snooping binding configuration command on a switch?",
        options: ["It switches a trunk port to access mode.", "It checks the source L2 address in the Ethernet header against the ARP body.", "It restricts the number of discovery messages, per second.", "It displays the IP-to-MAC address associations for switch interfaces."],
        correctAnswers: [3],
        type: 'single',
        explanation: "The show ip dhcp snooping binding command displays the IP-to-MAC address bindings learned by DHCP snooping."
    },
    {
        id: 165,
        question: "What action takes place when the source MAC address of a frame entering a switch is in the MAC address table?",
        options: ["The switch forwards the frame out of the specified port.", "The switch updates the refresh timer for the entry.", "The switch replaces the old entry and uses the more current port.", "The switch adds a MAC address table entry for the destination MAC address."],
        correctAnswers: [1],
        type: 'single',
        explanation: "When a known MAC address is received, the switch updates (refreshes) the timer for that entry."
    },
    {
        id: 166,
        question: "A small publishing company has 200 devices receiving broadcasts. How can the administrator reduce the number of devices that receive broadcast traffic?",
        options: ["Add more switches so that fewer devices are on a particular switch.", "Replace the switches with switches that have more ports.", "Segment the LAN into smaller LANs and route between them.", "Replace at least half of the switches with hubs."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Segmenting into smaller LANs with routing between them creates separate broadcast domains."
    },
    {
        id: 167,
        question: "What defines a host route on a Cisco router?",
        options: ["The link-local address is added automatically to the routing table.", "An IPv4 static host route uses a destination IP address and a /32 subnet mask.", "A host route is designated with a C in the routing table.", "A static IPv6 host route must include the interface type and number."],
        correctAnswers: [1],
        type: 'single',
        explanation: "A host route uses a /32 mask (IPv4) or /128 mask (IPv6) to match a single specific host."
    },
    {
        id: 168,
        question: "What else is required when configuring an IPv6 static route using a next-hop link-local address?",
        options: ["administrative distance", "ip address of the neighbor router", "network number and subnet mask on the neighbor router", "interface number and type"],
        correctAnswers: [3],
        type: 'single',
        explanation: "When using a link-local next-hop address, you must also specify the exit interface type and number."
    },
    {
        id: 169,
        question: "Which two authentication methods are used with WPA2 on a SOHO wireless router? (Choose two.)",
        options: ["personal", "AES", "TKIP", "WEP", "enterprise"],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "WPA2 supports personal (PSK) and enterprise (RADIUS) authentication methods."
    },
    {
        id: 170,
        question: "Which mitigation technique would prevent rogue servers from providing false IPv6 configuration parameters to clients?",
        options: ["enabling DHCPv6 Guard", "enabling RA Guard", "implementing port security on edge ports", "disabling CDP on edge ports"],
        correctAnswers: [0],
        type: 'single',
        explanation: "DHCPv6 Guard prevents rogue DHCPv6 servers from providing false configuration to clients."
    },
    {
        id: 171,
        question: "A PC has sent an RS message to an IPv6 router. Which two pieces of information will the router send to the client? (Choose two.)",
        options: ["prefix length", "subnet mask in dotted decimal notation", "domain name", "administrative distance", "prefix", "DNS server IP address"],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "The router sends the network prefix and prefix length in the Router Advertisement (RA) message."
    },
    {
        id: 172,
        question: "While attending a conference, a guest speaker's laptop fails to display any available wireless networks. The access point must be operating in which mode?",
        options: ["mixed", "passive", "active", "open"],
        correctAnswers: [2],
        type: 'single',
        explanation: "In active mode, the AP does not broadcast its SSID and clients must know the SSID to connect."
    },
    {
        id: 173,
        question: "Which three components are combined to form a bridge ID? (Choose three.)",
        options: ["extended system ID", "cost", "IP address", "bridge priority", "MAC address", "port ID"],
        correctAnswers: [0, 3, 4],
        type: 'multiple',
        explanation: "The bridge ID consists of bridge priority, extended system ID, and MAC address."
    },
    {
        id: 174,
        question: "On a Cisco 3504 WLC Summary page (Advanced > Summary), which tab allows a network administrator to configure a particular WLAN with a WPA2 policy?",
        options: ["SECURITY", "WIRELESS", "WLANs", "MANAGEMENT"],
        correctAnswers: [2],
        type: 'single',
        explanation: "The WLANs tab allows configuration of WLANs including security policies like WPA2."
    }
];
